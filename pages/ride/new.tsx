import { useState } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicFetchPost } from "../../lib/basicFetch";
import BasicButton from "../../components/BasicButton";
import BasicInput from "../../components/BasicInput";
import { NewRide, NewRideSchema } from "../../types/NewRide";

export default function CreateRide() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewRide>({
    resolver: zodResolver(NewRideSchema),
  });

  const onSubmit: SubmitHandler<NewRide> = async (data) => {
    setIsSubmitError(false);
    setIsSubmitting(true);
    try {
      await basicFetchPost("/api/rides", data);
      reset();
    } catch (err: any) {
      if (err.name === "401") {
        // redirect to login
        router.push(`/login?redirect=/ride/new`);
        // save to localStorage
      } else {
        setIsSubmitError(true);
      }
    } finally {
      setIsSubmitting(false);
    }
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
      {isSubmitError && (
        <p className="text-red-600 text-sm">
          There was an error submitting your ride.
        </p>
      )}
    </form>
  );
}
