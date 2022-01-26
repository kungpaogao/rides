import { forwardRef, RefObject, useEffect, useRef, useState } from "react";
import { autocompleteOptions, loader } from "../lib/googleMapLoader";
import BasicInput, { BasicInputProps } from "./BasicInput";

type PlaceSearchInputProps = BasicInputProps & {
  autocompleteRef: RefObject<HTMLInputElement>;
};

const PlaceSearchInput = forwardRef<HTMLInputElement, PlaceSearchInputProps>(
  ({ autocompleteRef, ...rest }, ref) => {
    async function loadAutocomplete() {
      await loader.load();
      const autocomplete = new google.maps.places.Autocomplete(
        autocompleteRef.current!,
        autocompleteOptions
      );
    }

    useEffect(() => {
      loadAutocomplete();
    }, []);

    return <BasicInput ref={ref} {...rest} />;
  }
);

export default PlaceSearchInput;
