import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prismaClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // TODO: query params
    try {
      const rides = await prisma.ride.findMany();
      res.status(200).json(rides);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  } else if (req.method === "POST") {
    // creating new ride
    const data = req.body;
    try {
      const newRide = await prisma.ride.create({
        data,
      });
      res.status(200).json(newRide);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  } else {
    res.status(404);
  }
};
