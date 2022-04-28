import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prismaClient";
import { queryToString } from "../../../lib/queryToString";
import { checkAuth } from "../../../lib/checkAuth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  try {
    await checkAuth(req);

    if (method === "GET") {
      const ride = await prisma.ride.findUnique({
        where: { id: queryToString(id) },
      });
      res.status(200).json(ride);
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err: any) {
    console.error(err);
    res
      .status(err.name === "Error" ? 500 : err.name)
      .json({ error: { message: err.message } });
  }
};
