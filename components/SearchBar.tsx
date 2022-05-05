import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { SearchRideQuery, SearchRideQuerySchema } from "../types/SearchRide";
import BasicButton from "./BasicButton";
import BasicInput from "./BasicInput";
import PlaceSearchInput from "./PlaceSearchInput";

type SearchBarProps = {
  from?: string;
  to?: string;
  date?: string;
  compact?: boolean;
  onSearchSubmit?: () => void;
};

export default function SearchBar({
  from,
  to,
  date,
  compact: isCompact,
  onSearchSubmit,
}: SearchBarProps) {
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

  const onSubmit: SubmitHandler<SearchRideQuery> = async ({
    from,
    to,
    datetime,
  }) => {
    onSearchSubmit?.();
    const searchParams = new URLSearchParams({
      from,
      to,
      dt: dayjs(datetime).toISOString(),
    });
    push(`/search?${searchParams}`);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className={`mx-auto flex flex-wrap items-center ${
        isCompact ? "gap-1" : "gap-2"
      } rounded-lg
   border bg-gray-100 p-1 md:flex-nowrap`}
    >
      <PlaceSearchInput
        label="From"
        placeholder="Ithaca, NY"
        className={`group w-full rounded-md border 
    border-gray-100 ${isCompact ? "p-0" : "p-3"} focus-within:border-gray-200 
    focus-within:bg-white focus-within:shadow-lg md:flex-1`}
        labelClassName="px-2 font-semibold"
        inputClassName="w-full border-none bg-transparent"
        autocompleteRef={searchFromAutocompleteRef}
        ref={(e) => {
          searchFromRef(e);
          searchFromAutocompleteRef.current = e;
        }}
        defaultValue={from}
        {...searchFromRest}
      />
      <PlaceSearchInput
        label="To"
        placeholder="New York, NY"
        className={`group w-full rounded-md border 
    border-gray-100 ${isCompact ? "p-0" : "p-3"} focus-within:border-gray-200 
    focus-within:bg-white focus-within:shadow-lg md:flex-1`}
        labelClassName="px-2 font-semibold"
        inputClassName="w-full border-none bg-transparent"
        autocompleteRef={searchToAutocompleteRef}
        ref={(e) => {
          searchToRef(e);
          searchToAutocompleteRef.current = e;
        }}
        defaultValue={to}
        {...searchToRest}
      />
      <BasicInput
        label="Date"
        type="date"
        className={`group w-full rounded-md border border-gray-100 
        ${
          isCompact ? "p-0" : "p-3"
        } focus-within:border-gray-200 focus-within:bg-white 
    focus-within:shadow-lg md:flex-1`}
        labelClassName="px-2 font-semibold"
        inputClassName="w-full border-none bg-transparent text-left"
        defaultValue={date?.split("T")[0]} // kinda jank...
        {...register("datetime", { valueAsDate: true })}
      />
      <BasicButton
        className={`mx-3 mb-3 flex w-full items-center justify-center 
    rounded-lg ${
      isCompact ? "py-1" : "py-3"
    } hover:shadow-lg md:mb-0 md:aspect-square md:w-12`}
        type="submit"
      >
        <FiSearch size={20} title="Search" />
        <span className="ml-2 md:hidden">Search</span>
      </BasicButton>
    </form>
  );
}
