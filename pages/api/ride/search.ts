import { Ride } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getDistance } from "geolib";
import { geocode } from "../../../lib/googleMaps";
import { prisma } from "../../../lib/prismaClient";
import { queryToString } from "../../../lib/queryToString";
import { SearchRideQueryDbSchema } from "../../../types/SearchRide";
import { checkAuth } from "../../../lib/checkAuth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await checkAuth(req);

  const {
    // frad and trad defaults are 100km
    query: { from, to, dt },
    method,
  } = req;

  if (method === "GET") {
    try {
      if (!from || !to) throw new Error("Bad request");

      const [{ lat: flat, lng: flng }, { lat: tlat, lng: tlng }] =
        await geocode([queryToString(from), queryToString(to)]);

      const args = {
        flat,
        flng,
        frad: 100,
        tlat,
        tlng,
        trad: 100,
        dt: new Date(queryToString(dt)),
        dayrange: 10,
      };

      // validate request
      SearchRideQueryDbSchema.parse(args);

      const response = await prisma.$queryRaw`
        SELECT * 
        FROM rides 
        WHERE ${args.dt} - datetime  < (${args.dayrange}::integer * interval '1 day')`;

      const M_TO_MI = 0.6213711922 / 1000;

      const rides = (response as Ride[])
        .map((ride) => ({
          ...ride,
          fromDistance:
            getDistance(
              { latitude: ride.fromLat, longitude: ride.fromLng },
              { latitude: args.flat, longitude: args.flng },
              100
            ) * M_TO_MI,
          toDistance:
            getDistance(
              { latitude: ride.toLat, longitude: ride.toLng },
              { latitude: args.tlat, longitude: args.tlng },
              100
            ) * M_TO_MI,
        }))
        .filter(({ fromDistance }) => fromDistance <= args.frad)
        .filter(({ toDistance }) => toDistance <= args.trad);

      res.status(200).json(rides);
    } catch (err: any) {
      console.error(err);
      res
        .status(err.name === "Error" ? 500 : err.name)
        .json({ error: { message: err.message } });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
