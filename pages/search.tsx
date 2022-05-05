import { ReactElement, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFetchStatus } from "../lib/useFetchStatus";
import Loading from "../components/Loading";
import SearchResult from "../components/SearchResult";
import SearchFilters from "../components/SearchFilters";
import { SearchRideResult } from "../types/SearchRide";
import PageStatus from "../types/PageStatus";
import { useNavigation } from "../lib/hooks/useNavigation";
import Layout from "../components/Layout";

export default function Search() {
  const { isReady } = useRouter();

  const { urlSearchParams, redirect } = useNavigation();

  const {
    data: results,
    error,
    status: pageStatus,
  } = useFetchStatus<SearchRideResult[], Error>(
    isReady ? `/api/ride/search?${urlSearchParams}` : null
  );

  const [filteredResults, setFilteredResults] = useState(results);

  if (pageStatus === PageStatus.Error) {
    return (
      <div className="prose w-full max-w-full py-7 prose-h3:mt-0">
        <h2>Results</h2>
        {error?.name === "401" ? (
          <div className="flex items-center justify-center">
            <p>
              Please <Link href={`/login?redirect=${redirect}`}>log in</Link>.
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            {error?.message || "Something went wrong :("}
          </div>
        )}
      </div>
    );
  }

  if (pageStatus === PageStatus.Success && results) {
    return (
      <div className="prose w-full max-w-full pb-7 prose-h3:mt-0">
        <div className="mt-7">
          <SearchFilters data={results} onApplyFilters={setFilteredResults} />
        </div>

        <div className="mt-5 flex w-full flex-col gap-3">
          {(filteredResults || results).map((result) => (
            <SearchResult key={result.id} result={result} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="prose w-full max-w-full py-7 prose-h3:mt-0">
      <h2>Results</h2>
      <div className="flex flex-col items-center justify-center gap-3">
        <Loading />
      </div>
    </div>
  );
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout navigationProps={{ isSearchVisible: true }}>{page}</Layout>;
};
