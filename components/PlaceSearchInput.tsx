import { useEffect, useRef } from "react";
import { loader } from "../lib/googleMapLoader";
import BasicInput from "./BasicInput";

export default function PlaceSearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const center = { lat: 42.45210413413547, lng: -76.48034161104488 };
  const defaultBounds = {
    north: center.lat + 7.5,
    south: center.lat - 7.5,
    east: center.lng + 7.5,
    west: center.lng - 7.5,
  };
  const options: google.maps.places.AutocompleteOptions = {
    bounds: defaultBounds,
    strictBounds: true,
    componentRestrictions: { country: ["us", "ca"] },
    fields: ["geometry"],
    types: ["(cities)"],
  };

  async function loadAutocomplete() {
    await loader.load();
    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
  }

  useEffect(() => {
    loadAutocomplete();
  }, []);

  return (
    <BasicInput
      placeholder="Ithaca, NY"
      label={"Place Search"}
      ref={inputRef}
    />
  );
}
