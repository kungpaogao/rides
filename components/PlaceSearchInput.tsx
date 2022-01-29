import { forwardRef, RefObject, useEffect } from "react";
import { autocompleteOptions, loader } from "../lib/googleMaps";
import { supabase } from "../lib/supabaseClient";
import BasicInput, { BasicInputProps } from "./BasicInput";

type PlaceSearchInputProps = BasicInputProps & {
  autocompleteRef: RefObject<HTMLInputElement>;
};

const PlaceSearchInput = forwardRef<HTMLInputElement, PlaceSearchInputProps>(
  ({ autocompleteRef, ...rest }, ref) => {
    async function loadAutocomplete() {
      // do not load if user is not authenticated
      if (!supabase.auth.session()) return;
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
