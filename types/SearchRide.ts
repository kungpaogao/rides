import { z } from "zod";

export type SearchRide = {
  datetime: Date;
  from: string;
  to: string;
};

const SearchRideSchema = z.object({
  datetime: z.date(),
  from: z.string().min(1),
  to: z.string().min(1),
});

export { SearchRideSchema };
