import { Slider } from "@mantine/core";
import { useContext } from "react";
import BasicInput from "./BasicInput";
import { FilterContext } from "./SearchFilters";

export default function SearchFilterPrice() {
  const {
    price: [maxPrice, setMaxPrice],
  } = useContext(FilterContext);

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
