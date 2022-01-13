import { useState, useEffect } from "react";
import BasicButton from "../components/BasicButton";
import BasicDropdown from "../components/BasicDropdown";
import BasicDropdownItem from "../components/BasicDropdownItem";
import { Ride } from "../types/Ride";

const sample: Ride[] = [
  {
    id: "0",
    from: "Boston",
    to: "New York",
    datetime: new Date(),
    numSeats: 3,
    email: "abc123@cornell.edu",
    phone: "6071234567",
  },
  {
    id: "1",
    from: "Boston",
    to: "Ithaca",
    datetime: new Date(),
    numSeats: 1,
    email: "abc123@cornell.edu",
    phone: "6071234567",
  },
  {
    id: "2",
    from: "Ithaca",
    to: "New York",
    datetime: new Date(),
    numSeats: 2,
    email: "abc123@cornell.edu",
    phone: "6071234567",
  },
];

export default function Results() {
  const [results, setResults] = useState<Ride[]>([]);

  useEffect(() => {
    async function getResults() {
      const samplePromise = await new Promise<Ride[]>((resolve, reject) => {
        setTimeout(() => {
          resolve(sample);
        }, 300);
      });
      setResults(samplePromise);
    }
    getResults();
  }, [setResults]);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="prose prose-h3:mt-0 w-full">
      <h2>Results</h2>
      <div className="flex flex-col gap-3">
        {results.map(({ id, from, to, datetime, numSeats, email, phone }) => (
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
        ))}
      </div>
    </div>
  );
}
