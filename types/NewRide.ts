import { z } from "zod";

export type NewRide = {
  datetime: Date;
  from: string;
  to: string;
  numSeats: number;
  phone: string;
  netId: string;
};

const NewRideSchema = z.object({
  datetime: z.date(),
  from: z.string().min(1),
  to: z.string().min(1),
  numSeats: z.number().gt(1).lt(10),
  phone: z.string().min(1),
  netId: z.string().min(1),
});

export { NewRideSchema };
