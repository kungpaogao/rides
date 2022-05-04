import { Slider } from "@mantine/core";
import BasicInput from "./BasicInput";

export default function SearchFilterPrice({
  price: [maxPrice, setMaxPrice],
}: any) {
  return (
    <>
      <Slider
        className="my-7"
        min={0}
        max={100}
        step={10}
        value={maxPrice}
        onChange={setMaxPrice}
        labelAlwaysOn
        label={(value) => `$${value}`}
      />
      <BasicInput
        label="Max price ($)"
        value={maxPrice}
        type="number"
        min={0}
        max={100}
        step={10}
        onChange={(e) => setMaxPrice(parseInt(e.target.value) || 0)}
      />
    </>
  );
}
