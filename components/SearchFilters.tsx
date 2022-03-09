import { SetStateAction, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import BasicButton from "./BasicButton";
import { FiX } from "react-icons/fi";
import { RangeCalendar, TimeRangeInput } from "@mantine/dates";
import { Slider } from "@mantine/core";
import BasicInput from "./BasicInput";

type SearchFiltersProps = {
  className?: string;
  onShowSearchFilters?: React.Dispatch<SetStateAction<boolean>>;
};

type FilterContentProps = {
  filter: FilterType;
};

type FilterType = "price" | "date" | "time" | "distance";

function FilterContent({ filter }: FilterContentProps) {
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(),
    new Date(),
  ]);

  const [timeRange, setTimeRange] = useState<[Date, Date]>([
    new Date(),
    new Date(),
  ]);

  const [maxPrice, setMaxPrice] = useState(40);

  const [maxDistance, setMaxDistance] = useState(10);

  switch (filter) {
    case "date":
      return (
        <>
          <RangeCalendar
            className="mx-auto"
            value={dateRange}
            onChange={setDateRange}
          />
        </>
      );
    case "time":
      return (
        <>
          <TimeRangeInput
            label="Time range"
            value={timeRange}
            onChange={setTimeRange}
          />
        </>
      );
    case "price":
      return (
        <>
          <Slider
            min={0}
            max={100}
            step={10}
            value={maxPrice}
            onChange={setMaxPrice}
            label={(value) => `$${value}`}
          />
          <BasicInput
            label="Max price"
            value={maxPrice}
            type="number"
            min={0}
            max={100}
            step={10}
            onChange={(e) => setMaxPrice(parseInt(e.target.value) || 0)}
          />
        </>
      );
    case "distance":
      return (
        <>
          <Slider
            min={10}
            max={100}
            step={10}
            value={maxDistance}
            onChange={setMaxDistance}
            label={(value) => `${value} miles`}
          />
          <BasicInput
            label="Max distance"
            value={maxDistance}
            type="number"
            min={10}
            max={100}
            step={10}
            onChange={(e) => setMaxDistance(parseInt(e.target.value) || 10)}
          />
        </>
      );
  }
}

export default function SearchFilters({
  className,
  onShowSearchFilters,
}: SearchFiltersProps) {
  const [currentFilter, setCurrentFilter] = useState<FilterType | null>(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  function showFilter(filter: FilterType) {
    return () => {
      setCurrentFilter(filter);
      setIsFilterDialogOpen(true);
    };
  }

  return (
    <div className={`flex w-full flex-row gap-3 ${className}`}>
      <Dialog.Root open={isFilterDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/20">
            <Dialog.Content className="mx-auto w-96 rounded-md border bg-white shadow-lg">
              <div className="flex items-center border-b p-3">
                <Dialog.Close asChild>
                  <BasicButton
                    flat
                    className="fixed border-none bg-white p-0 text-black"
                    onClick={() => setIsFilterDialogOpen(false)}
                  >
                    <FiX />
                  </BasicButton>
                </Dialog.Close>
                <Dialog.Title className="flex-1 text-center font-bold">
                  Filter {currentFilter}
                </Dialog.Title>
              </div>
              <div className="p-3">
                {currentFilter && <FilterContent filter={currentFilter} />}
              </div>
              <div className="border-t p-3">
                <BasicButton
                  flat
                  className="border-gray-200 bg-white text-black"
                >
                  Clear
                </BasicButton>
                <BasicButton className="float-right">Save</BasicButton>
              </div>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>

      <BasicButton
        onClick={showFilter("price")}
        className="rounded-full bg-white px-3 text-black"
      >
        Price
      </BasicButton>
      <BasicButton
        onClick={showFilter("distance")}
        className="rounded-full bg-white px-3 text-black"
      >
        Distance
      </BasicButton>
      <BasicButton
        onClick={showFilter("date")}
        className="rounded-full bg-white px-3 text-black"
      >
        Dates
      </BasicButton>
      <BasicButton
        onClick={showFilter("time")}
        className="rounded-full bg-white px-3 text-black"
      >
        Time
      </BasicButton>
    </div>
  );
}
