import { Slider } from "@mantine/core";
import { useContext } from "react";
import BasicInput from "./BasicInput";
import { FilterContext } from "./SearchFilters";

export default function SearchFilterDistance() {
  const {
    distance: [maxDistance, setMaxDistance],
  } = useContext(FilterContext);

  return (
    <>
      <Slider
        className="my-7"
        min={0}
        max={100}
        step={10}
        value={maxDistance}
        onChange={setMaxDistance}
        labelAlwaysOn
        label={(value) => `${value} miles`}
      />
      <BasicInput
        label="Max distance (miles)"
        value={maxDistance}
        type="number"
        min={0}
        max={100}
        step={10}
        onChange={(e) => setMaxDistance(parseInt(e.target.value) || 0)}
      />
    </>
  );
}
