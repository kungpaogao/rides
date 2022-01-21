import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prismaClient";
import { supabase } from "../../lib/supabaseClient";
import { NewRide, NewRideSchema } from "../../types/NewRide";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // check authorization
  const auth = req.headers.authorization;
  if (!auth) {
    // if missing authorization headers, return 401
    res.status(401).json("Unauthorized");
  }

  // get user
  const { user, error } = await supabase.auth.api.getUser(auth!);
  if (!user || error) {
    res.status(401).json("Unauthorized");
  }
  if (user && !user.email?.endsWith("@cornell.edu")) {
    res.status(403).json("Forbidden");
  }

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
    try {
      let data: NewRide = req.body;
      data = { ...data, datetime: new Date(data.datetime) };
      // validate
      NewRideSchema.parse(data);

      // construct new ride
      const ride: any = {
        datetime: data.datetime,
        from: data.from,
        to: data.to,
        numSeats: data.numSeats,
        phone: data.phone,
        email: `${data.netId}@cornell.edu`, // TODO: probably just add this automatically
        user: user?.id,
      };

      const newRide = await prisma.ride.create({
        data: ride,
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
