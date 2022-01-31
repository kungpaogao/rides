import { z } from "zod";

export type SearchRide = {
  datetime: Date;
  from: string;
  to: string;
};

export type SearchRideResult = {
  id: string;
  datetime: Date;
  from: string;
  to: string;
  numSeats: number;
  phone: string;
  email: string;
};

const SearchRideSchema = z.object({
  datetime: z.date(),
  from: z.string().min(1),
  to: z.string().min(1),
});

const SearchRideDbSchema = z.object({
  flat: z.number(),
  flng: z.number(),
  frad: z.number().int().positive(),
  tlat: z.number(),
  tlng: z.number(),
  trad: z.number().int().positive(),
  dt: z.date(),
  dayrange: z.number().int().positive(),
});

export { SearchRideSchema, SearchRideDbSchema };
