import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import sanitizeHtml from "sanitize-html";
import { z } from "zod";
import { prisma } from "../../lib/prismaClient";
import { sendEmail } from "../../lib/sendInBlueClient";
import { checkAuth } from "./auth";

const EMAIL_RATE_LIMIT = 5;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  try {
    const user = await checkAuth(req);

    if (method === "POST") {
      // TODO: rate limit
      const now24HBefore = dayjs().subtract(24, "hour").toDate();

      const messageCount = await prisma.message.count({
        where: {
          user: user.id,
          createdAt: {
            gte: now24HBefore,
          },
        },
      });

      if (messageCount >= EMAIL_RATE_LIMIT) {
        const error = new Error("Too many requests.");
        error.name = "429";
        throw error;
      }

      const { to, sender, message } = body;

      const isEmail = z.string().email();

      isEmail.parse(to);
      isEmail.parse(sender);

      const toEmail = { name: to.split("@")[0], email: to };
      const senderEmail = { name: sender.split("@")[0], email: sender };
      const cleanMessage = sanitizeHtml(
        message.replace(/(?:\r\n|\r|\n)/g, "<br />")
      );

      await prisma.message.create({
        data: {
          user: user.id,
          fromEmail: sender,
          toEmail: to,
          message: cleanMessage,
        },
      });

      const response = await sendEmail(toEmail, senderEmail, cleanMessage);
      res.status(200).json(response);
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err: any) {
    console.error(err);
    res
      .status(err.name === "Error" ? 500 : err.name)
      .json({ error: { message: err.message } });
  }
};
