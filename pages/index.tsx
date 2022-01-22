import { useRouter } from "next/router";
import BasicButton from "../components/BasicButton";
import BasicInput from "../components/BasicInput";

export default function Home() {
  const { push } = useRouter();

  return (
    <div className="prose prose-a:no-underline prose-h2:mt-2 w-full md:w-auto">
      <h1>Cornell Rides</h1>
      <BasicButton
        className="w-full md:w-auto"
        onClick={() => push("/ride/new")}
      >
        Post a ride
      </BasicButton>
      <div className="w-full flex items-center gap-5">
        <span className="flex-1 border-b-2" />
        <p>or</p>
        <span className="flex-1 border-b-2" />
      </div>
      <h2>Search a ride</h2>
      <BasicInput expand name="search-from" label="From" placeholder="Ithaca" />
      <BasicInput
        className="mt-3"
        expand
        name="search-to"
        label="To"
        placeholder="Boston"
      />
      <BasicInput
        className="mt-3"
        expand
        name="search-date"
        label="Date"
        type="date"
      />
      <BasicButton className="mt-5" expand onClick={() => push("/search")}>
        Search
      </BasicButton>
    </div>
  );
}
