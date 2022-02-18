import { Ride } from "@prisma/client";
import { z } from "zod";

export type SearchRideQuery = {
  datetime: Date;
  from: string;
  to: string;
};

export type SearchRideResult = Ride & {
  distance: number;
};

const SearchRideQuerySchema = z.object({
  datetime: z.date(),
  from: z.string().min(1),
  to: z.string().min(1),
});

const SearchRideQueryDbSchema = z.object({
  flat: z.number(),
  flng: z.number(),
  frad: z.number().int().positive(),
  tlat: z.number(),
  tlng: z.number(),
  trad: z.number().int().positive(),
  dt: z.date(),
  dayrange: z.number().int().positive(),
});

export { SearchRideQuerySchema, SearchRideQueryDbSchema };
