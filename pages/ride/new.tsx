import { useState } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicFetchPost } from "../../lib/basicFetch";
import BasicButton from "../../components/BasicButton";
import BasicInput from "../../components/BasicInput";
import { NewRide, NewRideSchema } from "../../types/NewRide";
import PlaceSearchInput from "../../components/PlaceSearchInput";
import { useRef } from "react";

export default function CreateRide() {
  const { push, pathname } = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<NewRide>({
    resolver: zodResolver(NewRideSchema),
  });

  const { ref: fromRef, ...fromRegisterRest } = register("from", {
    onBlur: (e) => {
      setValue("from", e.target.value);
    },
  });
  const { ref: toRef, ...toRegisterRest } = register("to", {
    onBlur: (e) => {
      setValue("to", e.target.value);
    },
  });
  const fromAutocompleteRef = useRef<HTMLInputElement | null>(null);
  const toAutocompleteRef = useRef<HTMLInputElement | null>(null);

  const onSubmit: SubmitHandler<NewRide> = async (data) => {
    setIsSubmitError(false);
    setIsSubmitting(true);
    try {
      await basicFetchPost("/api/rides", data);
      reset();
    } catch (err: any) {
      if (err.name === "401") {
        // redirect to login
        push(`/login?redirect=${pathname}`);
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
      <PlaceSearchInput
        expand
        label="From"
        autocompleteRef={fromAutocompleteRef}
        ref={(e) => {
          fromRef(e);
          fromAutocompleteRef.current = e;
        }}
        error={errors.to?.message}
        {...fromRegisterRest}
      />
      <PlaceSearchInput
        expand
        className="mt-3"
        label="To"
        autocompleteRef={toAutocompleteRef}
        ref={(e) => {
          toRef(e);
          toAutocompleteRef.current = e;
        }}
        error={errors.to?.message}
        {...toRegisterRest}
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
        defaultValue={0}
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
        <p className="text-sm text-red-600">
          There was an error submitting your ride.
        </p>
      )}
    </form>
  );
}
