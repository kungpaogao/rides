import { Slider } from "@mantine/core";
import BasicInput from "./BasicInput";

export default function SearchFilterDistance({
  distance: [maxDistance, setMaxDistance],
}: any) {
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
