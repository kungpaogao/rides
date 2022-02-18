import type { NextApiRequest, NextApiResponse } from "next";
import { geocode } from "../../lib/googleMaps";
import { prisma } from "../../lib/prismaClient";
import { queryToString } from "../../lib/queryToString";
import { supabase } from "../../lib/supabaseClient";
import { NewRide, NewRideSchema } from "../../types/NewRide";
import { SearchRideQueryDbSchema } from "../../types/SearchRide";

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
    try {
      const { from, to, frad = 100000, trad = 100000, dt, dr = 10 } = req.query;

      if (!from || !to) throw new Error();

      const [{ lat: flat, lng: flng }, { lat: tlat, lng: tlng }] =
        await geocode([queryToString(from), queryToString(to)]);

      const args = {
        flat,
        flng,
        frad,
        tlat,
        tlng,
        trad,
        dt: new Date(queryToString(dt)),
        dayrange: dr,
      };

      // validate request
      SearchRideQueryDbSchema.parse(args);

      // call db function
      // TODO: update rpc function to return SearchRideResult
      const { data: rides, error } = await supabase.rpc("search_rides", args);

      if (error || !rides) throw error;

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
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  } else {
    res.status(404);
  }
};
