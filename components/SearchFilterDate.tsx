import { RangeCalendar } from "@mantine/dates";
import { useContext } from "react";
import { FilterContext } from "./SearchFilters";

export default function SearchFilterDate() {
  const {
    date: [dateRange, setDateRange],
  } = useContext(FilterContext);

  return (
    <>
      <RangeCalendar
        className="mx-auto"
        initialMonth={dateRange[0] || undefined}
        value={dateRange}
        onChange={setDateRange}
      />
    </>
  );
}
