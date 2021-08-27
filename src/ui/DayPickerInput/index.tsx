import { useState } from "react";
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./react-day-picker.css";
import { FiCalendar } from "react-icons/fi";
import { parse, format } from "date-fns";

export default function DayPickerInput({
  date = format(new Date(), "M/d/yyyy"),
  dateFormat = "M/d/yyyy",
  setDate,
  inputProps,
}: {
  date?: string;
  dateFormat?: string;
  setDate?: (date: string) => void;
  inputProps?: InputProps;
}) {
  const currentYear = new Date().getFullYear();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isPopoverOpen}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            h="full"
            children={<Icon as={FiCalendar} />}
          />
          <Input
            {...inputProps}
            value={date}
            onFocus={() => setIsPopoverOpen(true)}
            placeholder="Date"
            onChange={(e) => {
              setDate?.(e.target.value);
            }}
          />
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Pick a day</PopoverHeader>
        <PopoverBody>
          <DayPicker
            fromDate={new Date()}
            fromYear={currentYear}
            toYear={currentYear + 1}
            required
            month={parse(date!, dateFormat, new Date())}
            selected={[parse(date!, dateFormat, new Date())]}
            onDayClick={(value: any) => {
              setDate?.(format(value, dateFormat));
              setIsPopoverOpen(false);
            }}
          />
        </PopoverBody>
        <PopoverFooter textAlign="right">
          <Button size="sm" onClick={() => setIsPopoverOpen(false)}>
            Done
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
