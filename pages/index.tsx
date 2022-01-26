import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import BasicButton from "../components/BasicButton";
import BasicInput from "../components/BasicInput";
import PlaceSearchInput from "../components/PlaceSearchInput";
import { SearchRide, SearchRideSchema } from "../types/SearchRide";

export default function Home() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SearchRide>({
    resolver: zodResolver(SearchRideSchema),
  });

  const searchFromAutocompleteRef = useRef<HTMLInputElement | null>(null);
  const searchToAutocompleteRef = useRef<HTMLInputElement | null>(null);
  const { ref: searchFromRef, ...searchFromRest } = register("from", {
    onBlur: (e) => {
      setValue("from", e.target.value);
    },
  });
  const { ref: searchToRef, ...searchToRest } = register("to", {
    onBlur: (e) => {
      setValue("to", e.target.value);
    },
  });

  const onSubmit: SubmitHandler<SearchRide> = async (data) => {
    console.log(data);
  };

  return (
    <div className="prose w-full prose-h2:mt-2 prose-a:no-underline md:w-auto">
      <h1>Cornell Rides</h1>
      <BasicButton
        className="w-full md:w-auto"
        onClick={() => push("/ride/new")}
      >
        Post a ride
      </BasicButton>
      <div className="flex w-full items-center gap-5">
        <span className="flex-1 border-b-2" />
        <p>or</p>
        <span className="flex-1 border-b-2" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Search a ride</h2>
        <PlaceSearchInput
          expand
          label="From"
          autocompleteRef={searchFromAutocompleteRef}
          ref={(e) => {
            searchFromRef(e);
            searchFromAutocompleteRef.current = e;
          }}
          error={errors.from?.message}
          {...searchFromRest}
        />
        <PlaceSearchInput
          expand
          className="mt-3"
          label="To"
          autocompleteRef={searchToAutocompleteRef}
          ref={(e) => {
            searchToRef(e);
            searchToAutocompleteRef.current = e;
          }}
          error={errors.to?.message}
          {...searchToRest}
        />
        <BasicInput
          expand
          className="mt-3"
          label="Date"
          type="date"
          error={errors.datetime?.message}
          {...register("datetime", { valueAsDate: true })}
        />
        <BasicButton className="mt-5" expand type="submit">
          Search
        </BasicButton>
      </form>
    </div>
  );
}
