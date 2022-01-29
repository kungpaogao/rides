import { Loader } from "@googlemaps/js-api-loader";
import {
  Client,
  GeocodeRequest,
  LatLngLiteral,
} from "@googlemaps/google-maps-services-js";

export const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_PLACES_API_KEY || "",
  version: "weekly",
  libraries: ["places"],
});

// Cornell University coordinates
const center = { lat: 42.45210413413547, lng: -76.48034161104488 };

// bounding box of ~750km each direction
const defaultBounds = {
  north: center.lat + 7.5,
  south: center.lat - 7.5,
  east: center.lng + 7.5,
  west: center.lng - 7.5,
};

export const autocompleteOptions: google.maps.places.AutocompleteOptions = {
  bounds: defaultBounds,
  strictBounds: true,
  componentRestrictions: { country: ["us", "ca"] },
  fields: ["geometry"],
  types: ["(cities)"],
};

export const client = new Client({});

function geocodeRequestWithKey(address: string): GeocodeRequest {
  return {
    params: {
      key: process.env.GEOCODING_API_KEY || "",
      address,
    },
  };
}

export async function geocode(locations: string[]): Promise<LatLngLiteral[]> {
  const geoResponses = await Promise.all(
    locations.map((loc) => client.geocode(geocodeRequestWithKey(loc)))
  );
  return geoResponses.map((geo) => geo.data.results[0].geometry.location);
}
