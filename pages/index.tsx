import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import BasicButton from "../components/BasicButton";
import BasicInput from "../components/BasicInput";
import BasicToast from "../components/BasicToast";
import PlaceSearchInput from "../components/PlaceSearchInput";
import { SearchRideQuery, SearchRideQuerySchema } from "../types/SearchRide";

export default function Home() {
  const { push } = useRouter();

  const { register, handleSubmit, setValue } = useForm<SearchRideQuery>({
    resolver: zodResolver(SearchRideQuerySchema),
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

  // TODO: remove
  const [open, setOpen] = useState(true);

  const onSubmit: SubmitHandler<SearchRideQuery> = async ({
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
    <div className="w-full max-w-5xl py-7 lg:mx-auto">
      <h2 className="mt-8 text-5xl font-bold md:mt-16">
        Carpool with <br />
        other students
      </h2>
      <h3 className="mt-5 text-2xl">
        An open-source platform to post and search for rides.
      </h3>

      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-12 flex flex-wrap items-center gap-2 rounded-lg
         border bg-gray-100 p-1 md:flex-nowrap"
      >
        <PlaceSearchInput
          label="From"
          placeholder="Ithaca, NY"
          className="group w-full rounded-md border 
          border-gray-100 p-3 focus-within:border-gray-200 
          focus-within:bg-white focus-within:shadow-lg md:flex-1"
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
          className="group w-full rounded-md border 
          border-gray-100 p-3 focus-within:border-gray-200 
          focus-within:bg-white focus-within:shadow-lg md:flex-1"
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
          className="group w-full rounded-md border border-gray-100 
          p-3 focus-within:border-gray-200 focus-within:bg-white 
          focus-within:shadow-lg md:flex-1"
          labelClassName="px-2"
          inputClassName="w-full border-none bg-transparent"
          {...register("datetime", { valueAsDate: true })}
        />
        <BasicButton
          className="mx-3 mb-3 flex w-full items-center justify-center 
          rounded-lg py-3 hover:shadow-lg md:mb-0 md:aspect-square md:w-12"
          type="submit"
        >
          <FiSearch size={20} title="Search" />
          <span className="ml-2 md:hidden">Search</span>
        </BasicButton>
      </form>
      <div className="my-7 flex w-full items-center gap-5">
        <span className="flex-1 border-b-2" />
        <p>or</p>
        <span className="flex-1 border-b-2" />
      </div>
      <BasicButton
        className="w-full rounded-lg py-5"
        onClick={() => push("/ride/new")}
      >
        Post a ride
      </BasicButton>
      <BasicToast
        open={open}
        setOpen={setOpen}
        title="Notifications"
        description="We added notifications!"
        closeLabel="Cool!"
      />
    </div>
  );
}
