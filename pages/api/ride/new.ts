import { User } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { geocode } from "../../../lib/googleMaps";
import { prisma } from "../../../lib/prismaClient";
import { NewRide, NewRideSchema } from "../../../types/NewRide";
import { checkAuth } from "../auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await checkAuth(req);

    if (req.method === "POST") {
      // creating new ride
      let data: NewRide = req.body;
      data = { ...data, datetime: new Date(data.datetime) };

      // validate
      NewRideSchema.parse(data);

      // geocode
      const [fromLocation, toLocation] = await geocode([data.from, data.to]);

      // construct new ride
      const newRide: any = {
        datetime: data.datetime,
        fromAddr: data.from,
        fromLat: fromLocation.lat,
        fromLng: fromLocation.lng,
        toAddr: data.to,
        toLat: toLocation.lat,
        toLng: toLocation.lng,
        numSeats: data.numSeats,
        phone: data.phone,
        email: `${data.netId}@cornell.edu`,
        user: user!.id,
      };

      const ride = await prisma.ride.create({
        data: newRide,
      });

      res.status(200).json(ride);
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err: any) {
    console.error(err);
    res
      .status(err.name === "Error" ? 500 : err.name)
      .json({ error: { message: err.message } });
  }
};
