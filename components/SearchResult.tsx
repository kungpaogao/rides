import { Ride } from "@prisma/client";
import BasicButton from "./BasicButton";
import BasicDropdown from "./BasicDropdown";
import BasicDropdownItem from "./BasicDropdownItem";

type SearchResultProps = {
  result: Ride;
  className?: string;
};

export default function SearchResult({ result, className }: SearchResultProps) {
  const { id, fromAddr, toAddr, datetime, numSeats, email, price, phone } =
    result;

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
  }

  return (
    <div
      key={id}
      className={`flex w-full flex-row flex-wrap rounded-md border 
      border-gray-300 p-5 ${className}`}
    >
      <div className="w-full md:flex-1">
        <h3>
          {fromAddr} to {toAddr}
        </h3>
        <h4>{new Date(datetime).toLocaleString()}</h4>
        {numSeats} seats
      </div>
      <div className="flex w-full flex-col gap-2 md:w-auto">
        <BasicDropdown
          trigger={<BasicButton className="w-full">Email</BasicButton>}
        >
          <BasicDropdownItem>
            <a href={`mailto:${email}`}>Send email</a>
          </BasicDropdownItem>
          <BasicDropdownItem onClick={() => copyToClipboard(email)}>
            Copy email
          </BasicDropdownItem>
        </BasicDropdown>
        <BasicDropdown
          trigger={<BasicButton className="w-full">Phone</BasicButton>}
        >
          <BasicDropdownItem>
            <a href={`tel:${phone}`}>Call phone</a>
          </BasicDropdownItem>
          <BasicDropdownItem onClick={() => copyToClipboard(phone)}>
            Copy phone
          </BasicDropdownItem>
        </BasicDropdown>
      </div>
    </div>
  );
}
