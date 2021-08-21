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

import { DayPicker, useInput, UseInputOptions } from "react-day-picker";
import "react-day-picker/style.css";
import "./react-day-picker.css";
import { FiCalendar } from "react-icons/fi";

export default function DayPickerInput({
  date = new Date(),
  setDate,
  inputProps,
}: {
  date?: Date;
  setDate?: (date: Date) => void;
  inputProps?: InputProps;
}) {
  const currentYear = new Date().getFullYear();

  const options: UseInputOptions = {
    defaultSelected: date,
    fromYear: currentYear,
    toYear: currentYear + 1,
    format: "M/d/yyyy",
    required: true,
  };

  const input = useInput(options);

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
            {...input.fieldProps}
            {...inputProps}
            onFocus={() => setIsPopoverOpen(true)}
            placeholder="Date"
          />
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Pick a day</PopoverHeader>
        <PopoverBody>
          <DayPicker
            {...input.dayPickerProps}
            onSelect={(value: any) => {
              setDate?.(value);
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
