import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import BasicButton from "./BasicButton";
import { FiX } from "react-icons/fi";
import { SearchRideResult } from "../types/SearchRide";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import SearchFilterPrice from "./SearchFilterPrice";
import SearchFilterDistance from "./SearchFilterDistance";
import SearchFilterDate from "./SearchFilterDate";

type SearchFiltersProps = {
  data?: SearchRideResult[];
  className?: string;
  onShowSearchFilters?: Dispatch<SetStateAction<boolean>>;
  onApplyFilters?: Dispatch<SetStateAction<SearchRideResult[] | undefined>>;
};

type Filter = {
  id: string;
  title: string;
  filter: (comp: any) => (ride: SearchRideResult) => boolean;
  reset: () => void;
  setValue: any;
  content: any;
  activeFilter?: (ride: SearchRideResult) => boolean;
  activeValue?: any;
};

export default function SearchFilters({
  data,
  className,
  onApplyFilters,
}: SearchFiltersProps) {
  /** dialog state */
  const [dialogFilter, setDialogFilter] = useState<Filter | null>(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  /** controlled input states */
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [maxDistance, setMaxDistance] = useState<number>(100);

  const filterState: { [key: string]: any } = useMemo(
    () => ({
      date: [dateRange, setDateRange],
      price: [maxPrice, setMaxPrice],
      distance: [maxDistance, setMaxDistance],
    }),
    [dateRange, maxPrice, maxDistance]
  );

  const [activeFilters, setActiveFilters] = useState<{ [key: string]: Filter }>(
    {}
  );

  let filters: Filter[] = [
    {
      id: "price",
      title: "Price",
      filter: (comp: number) => (ride: SearchRideResult) => ride.price <= comp,
      reset: () => setMaxPrice(100),
      setValue: setMaxPrice,
      content: SearchFilterPrice,
    },
    {
      id: "distance",
      title: "Distance",
      filter: (comp: number) => (ride: SearchRideResult) =>
        ride.fromDistance <= comp && ride.toDistance <= comp,
      reset: () => setMaxDistance(100),
      setValue: setMaxDistance,
      content: SearchFilterDistance,
    },
    {
      id: "date",
      title: "Date",
      filter: (comp: [Date, Date]) => (ride: SearchRideResult) =>
        dayjs(ride.datetime).isBetween(comp[0], comp[1], "day", "[]"),
      reset: () => setDateRange([null, null]),
      setValue: setDateRange,
      content: SearchFilterDate,
    },
  ];

  /**
   * Set filter to show in dialog and open dialog
   */
  function showFilter(filter: Filter) {
    return () => {
      setDialogFilter(filter);
      setIsFilterDialogOpen(true);
    };
  }

  /**
   * Add filter to active filters
   */
  function saveFilter() {
    if (dialogFilter) {
      const value = filterState[dialogFilter.id][0];

      const newFilters = {
        ...activeFilters,
        [dialogFilter.id]: {
          ...dialogFilter,
          activeValue: value,
          activeFilter: dialogFilter.filter(value),
        },
      };

      setActiveFilters(newFilters);
    }
  }

  /**
   * Apply filters when active filters change and close dialog
   */
  useEffect(() => {
    onApplyFilters?.(getFilteredData());
    closeDialog();
  }, [activeFilters]);

  /**
   * Reset filter to default value
   */
  function clearFilter() {
    dialogFilter?.reset();
  }

  /**
   * Returns filtered data
   */
  function getFilteredData() {
    dayjs.extend(isBetween);
    let filteredData = data;

    Object.keys(activeFilters).forEach((filterKey) => {
      const { activeFilter } = activeFilters[filterKey];
      filteredData = filteredData?.filter(activeFilter!);
    });

    return filteredData;
  }

  /**
   * Closes dialog and resets filter state if it's inactive, or sets the filter
   * state to the active value
   */
  function closeDialog() {
    if (dialogFilter && activeFilters[dialogFilter.id] === undefined) {
      clearFilter();
    } else if (dialogFilter) {
      dialogFilter.setValue(activeFilters[dialogFilter.id].activeValue);
    }

    setIsFilterDialogOpen(false);
  }

  return (
    <div className={`flex w-full flex-row gap-3 ${className}`}>
      <Dialog.Root open={isFilterDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed top-0 bottom-0 left-0 right-0 flex animate-dialog-overlay-show items-center justify-center bg-black/20 transition-all">
            <Dialog.Content
              className="mx-auto w-96 animate-dialog-content-show rounded-md border bg-white shadow-lg"
              onEscapeKeyDown={closeDialog}
              onInteractOutside={closeDialog}
            >
              <div className="flex items-center border-b">
                <Dialog.Title className="flex-1 p-3 text-center font-semibold">
                  Filter by {dialogFilter?.id || ""}
                </Dialog.Title>
                <Dialog.Close asChild>
                  <BasicButton
                    flat
                    className="mr-1 rounded-full border-none bg-white p-3 text-black"
                    onClick={closeDialog}
                  >
                    <FiX />
                  </BasicButton>
                </Dialog.Close>
              </div>
              <div className="p-3">
                {dialogFilter && <dialogFilter.content {...filterState} />}
              </div>
              <div className="border-t p-3">
                <BasicButton
                  flat
                  className="border-gray-200 bg-white text-black"
                  onClick={clearFilter}
                >
                  Clear
                </BasicButton>
                <BasicButton onClick={saveFilter} className="float-right">
                  Save
                </BasicButton>
              </div>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>

      {filters.map((filter) => (
        <BasicButton
          key={filter.id}
          onClick={showFilter(filter)}
          className="rounded-full bg-white px-3 text-black"
        >
          {filter.title}
        </BasicButton>
      ))}
    </div>
  );
}
