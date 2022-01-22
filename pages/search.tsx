import BasicButton from "../components/BasicButton";
import BasicDropdown from "../components/BasicDropdown";
import BasicDropdownItem from "../components/BasicDropdownItem";
import PageStatus from "../types/PageStatus";
import { useFetchStatus } from "../lib/useFetchStatus";
import { Ride } from "@prisma/client";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();

  const {
    data: results,
    error,
    status: pageStatus,
  } = useFetchStatus<Ride[], Error>(`/api/rides/`);

  function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
  }

  if (pageStatus === PageStatus.Idle || pageStatus === PageStatus.Loading) {
    return (
      <div className="prose prose-h3:mt-0 w-full">
        <h2>Results</h2>
        <div className="flex flex-col gap-3 items-center justify-center">
          Loading...
        </div>
      </div>
    );
  }

  if (pageStatus === PageStatus.Error) {
    if (error?.name === "401") {
      router.push(`/login?redirect=${location.pathname}`);
    }

    return (
      <div className="prose prose-h3:mt-0 w-full">
        <h2>Results</h2>
        <div className="flex flex-col gap-3 items-center justify-center">
          {error?.message || "Something went wrong :("}
        </div>
      </div>
    );
  }

  if (pageStatus === PageStatus.Success && results) {
    return (
      <div className="prose prose-h3:mt-0 w-full">
        <h2>Results</h2>
        <div className="flex flex-col gap-3">
          {results.map(
            ({ id, from, to, datetime, numSeats, email, phone }: any) => (
              <div
                key={id}
                className="flex flex-row flex-wrap border border-gray-300 rounded-md p-5"
              >
                <div className="w-full md:flex-1">
                  <h3>
                    {from} to {to}
                  </h3>
                  <h4>{datetime.toLocaleString()}</h4>
                  {numSeats} seats
                </div>
                <div className="w-full md:w-auto">
                  <BasicDropdown
                    trigger={
                      <BasicButton className="w-full">Email</BasicButton>
                    }
                  >
                    <BasicDropdownItem>
                      <a href={`mailto:${email}`}>Send email</a>
                    </BasicDropdownItem>
                    <BasicDropdownItem onClick={() => copyToClipboard(email)}>
                      Copy email
                    </BasicDropdownItem>
                  </BasicDropdown>
                  <BasicDropdown
                    trigger={
                      <BasicButton className="w-full">Phone</BasicButton>
                    }
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
            )
          )}
        </div>
      </div>
    );
  }
}
