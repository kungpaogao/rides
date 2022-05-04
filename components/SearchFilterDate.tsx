import { RangeCalendar } from "@mantine/dates";

export default function SearchFilterDate({
  date: [dateRange, setDateRange],
}: any) {
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
