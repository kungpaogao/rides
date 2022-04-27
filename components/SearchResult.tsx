import { Ride } from "@prisma/client";
import { useRouter } from "next/router";
import { FiArrowRight, FiChevronRight } from "react-icons/fi";
import BasicButton from "./BasicButton";

type SearchResultProps = {
  result: Ride;
  className?: string;
};

export default function SearchResult({
  result: { id, fromAddr, toAddr, datetime, numSeats, email, price, phone },
  className = "",
}: SearchResultProps) {
  const { push } = useRouter();

  return (
    <BasicButton
      className="border-gray-300 bg-white p-0 text-black"
      onClick={() => {
        push({ pathname: "/ride/[id]", query: { id } });
      }}
    >
      <div
        className={`flex w-full flex-row flex-wrap items-center
      p-5 text-left ${className}`}
      >
        <div className="flex-1">
          <h3 className="my-0 flex flex-wrap items-center text-xl font-semibold">
            {fromAddr}
            <span className="mx-2">
              <FiArrowRight />
            </span>
            {toAddr}
          </h3>
          <time dateTime={new Date(datetime).toISOString()}>
            {new Date(datetime).toLocaleString()}
          </time>
        </div>
        <div className="text-right">
          <div className="text-xl font-semibold">${price}</div>
          <div className="leading-snug">{numSeats} seats</div>
        </div>
        <div className="ml-5">
          <FiChevronRight size={24} />
        </div>
      </div>
    </BasicButton>
  );
}
