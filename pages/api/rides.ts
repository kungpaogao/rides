import { User } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { geocode } from "../../lib/googleMaps";
import { prisma } from "../../lib/prismaClient";
import { queryToString } from "../../lib/queryToString";
import { supabase } from "../../lib/supabaseClient";
import { NewRide, NewRideSchema } from "../../types/NewRide";
import { SearchRideQueryDbSchema } from "../../types/SearchRide";
import { checkAuth } from "./auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  async function searchRides() {
    const { from, to, frad = 100000, trad = 100000, dt, dr = 10 } = req.query;

    if (!from || !to) throw new Error("Bad request");

    const [{ lat: flat, lng: flng }, { lat: tlat, lng: tlng }] = await geocode([
      queryToString(from),
      queryToString(to),
    ]);

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
  }

  async function createRide(user: User) {
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
  }

  try {
    const user = await checkAuth(req);

    switch (req.method) {
      case "GET":
        await searchRides();
        break;

      case "POST":
        await createRide(user);
        break;

      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err: any) {
    console.error(err);
    res
      .status(err.name === "Error" ? 500 : err.name)
      .json({ error: { message: err.message } });
  }
};
