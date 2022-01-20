import { SubmitHandler, useForm } from "react-hook-form";
import BasicButton from "../../components/BasicButton";
import BasicInput from "../../components/BasicInput";
import { NewRide, NewRideSchema } from "../../types/NewRide";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { basicFetch } from "../../lib/basicFetch";
import { supabase } from "../../lib/supabaseClient";

export default function CreateRide() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewRide>({
    resolver: zodResolver(NewRideSchema),
  });

  const onSubmit: SubmitHandler<NewRide> = async (data) => {
    setIsSubmitting(true);
    try {
      await basicFetch("/api/rides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${supabase.auth.session()?.access_token}`,
        },
        body: JSON.stringify(data),
      });
      reset();
    } catch (err) {
      console.error(err);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="prose w-full md:w-auto">
      <h2>Ride Information</h2>
      <BasicInput
        expand
        label="From"
        placeholder="Ithaca"
        error={errors.from?.message}
        {...register("from")}
      />
      <BasicInput
        expand
        className="mt-3"
        label="To"
        placeholder="Boston"
        error={errors.to?.message}
        {...register("to")}
      />
      <BasicInput
        expand
        className="mt-3"
        label="Date"
        type="datetime-local"
        error={errors.datetime?.message}
        {...register("datetime", { valueAsDate: true })}
      />
      <BasicInput
        expand
        className="mt-3"
        label="Seats"
        type="number"
        min={0}
        error={errors.numSeats?.message}
        {...register("numSeats", { valueAsNumber: true })}
      />
      <h2>Contact Information</h2>
      <BasicInput
        expand
        label="Phone number"
        placeholder="1234567890"
        type="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />
      <BasicInput
        expand
        className="mt-3"
        label="NetID"
        placeholder="abc123"
        error={errors.netId?.message}
        {...register("netId")}
      />
      <BasicButton
        disabled={isSubmitting}
        className="mt-5 w-full"
        type="submit"
      >
        Submit
      </BasicButton>
    </form>
  );
}
