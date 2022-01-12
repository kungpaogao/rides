import { useRouter } from "next/router";
import BasicButton from "../components/BasicButton";
import BasicInput from "../components/BasicInput";

export default function Home() {
  const router = useRouter();

  function routeTo(route: string) {
    router.push(route);
  }

  return (
    <div className="prose prose-a:no-underline w-full md:w-auto">
      <h1>Cornell Rides</h1>
      <BasicButton
        className="w-full md:w-auto"
        onClick={() => routeTo("/new-ride")}
      >
        Post a ride
      </BasicButton>
      <p>or</p>
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
      <BasicButton className="mt-3" expand onClick={() => routeTo("/results")}>
        Search
      </BasicButton>
    </div>
  );
}
