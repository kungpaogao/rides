import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prismaClient";
import { supabase } from "../../lib/supabaseClient";
import { NewRide, NewRideSchema } from "../../types/NewRide";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, error } = await supabase.auth.api.getUser(
    req.headers.authorization!
  );

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

      console.log(req.headers.authorization!);
      console.log(user);

      if (!user) {
        res.redirect("/login");
        throw new Error("Unauthorized");
      }

      // construct new ride
      const ride: any = {
        datetime: data.datetime,
        from: data.from,
        to: data.to,
        numSeats: data.numSeats,
        phone: data.phone,
        email: `${data.netId}@cornell.edu`, // TODO: probably just add this automatically
        user: user.id,
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
