import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import BasicButton from "../components/BasicButton";
import BasicInput from "../components/BasicInput";
import PlaceSearchInput from "../components/PlaceSearchInput";
import { SearchRide, SearchRideSchema } from "../types/SearchRide";

export default function Home() {
  const { push } = useRouter();

  const { register, handleSubmit, setValue } = useForm<SearchRide>({
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

  const onSubmit: SubmitHandler<SearchRide> = async ({
    from,
    to,
    datetime,
  }) => {
    const searchParams = new URLSearchParams({
      from,
      to,
      dt: datetime.toISOString(),
    });
    push(`/search?${searchParams}`);
  };

  return (
    <div className="w-full py-7">
      <h2 className="text-5xl font-bold">
        Carpool with <br />
        other students
      </h2>
      <h3 className="mt-5 text-2xl">
        An open-source platform to post and search for rides.
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-12 flex max-w-5xl items-center rounded-lg border bg-gray-100 p-1"
      >
        <PlaceSearchInput
          label="From"
          placeholder="Ithaca, NY"
          className="group mr-2 flex-1 rounded-md border border-gray-100 p-3 focus-within:border-gray-200 focus-within:bg-white focus-within:shadow-lg"
          labelClassName="px-2"
          inputClassName="w-full border-none bg-transparent"
          autocompleteRef={searchFromAutocompleteRef}
          ref={(e) => {
            searchFromRef(e);
            searchFromAutocompleteRef.current = e;
          }}
          {...searchFromRest}
        />
        <PlaceSearchInput
          label="To"
          placeholder="New York, NY"
          className="group mr-2 flex-1 rounded-md border border-gray-100 p-3 focus-within:border-gray-200 focus-within:bg-white focus-within:shadow-lg"
          labelClassName="px-2"
          inputClassName="w-full border-none bg-transparent"
          autocompleteRef={searchToAutocompleteRef}
          ref={(e) => {
            searchToRef(e);
            searchToAutocompleteRef.current = e;
          }}
          {...searchToRest}
        />
        <BasicInput
          label="Date"
          type="date"
          className="group mr-2 flex-1 rounded-md border border-gray-100 p-3 focus-within:border-gray-200 focus-within:bg-white focus-within:shadow-lg"
          labelClassName="px-2"
          inputClassName="w-full border-none bg-transparent"
          {...register("datetime", { valueAsDate: true })}
        />
        <BasicButton
          className="mx-3 aspect-square w-12 rounded-lg border-black bg-black !p-3 text-white hover:shadow-lg"
          type="submit"
        >
          <FiSearch className="h-full w-full" title="Search" />
        </BasicButton>
      </form>
      <div className="flex w-full items-center gap-5">
        <span className="flex-1 border-b-2" />
        <p>or</p>
        <span className="flex-1 border-b-2" />
      </div>
      <BasicButton className="w-full" onClick={() => push("/ride/new")}>
        Post a ride
      </BasicButton>
    </div>
  );
}
