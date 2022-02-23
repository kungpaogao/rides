import PageStatus from "../types/PageStatus";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFetchStatus } from "../lib/useFetchStatus";
import Loading from "../components/Loading";
import { queryToString } from "../lib/queryToString";
import SearchResult from "../components/SearchResult";
import SearchFilters from "../components/SearchFilters";
import { SearchRideResult } from "../types/SearchRide";

export default function Search() {
  const { pathname, query, isReady } = useRouter();

  const urlSearchParams = () => {
    let params: any = {};
    Object.keys(query).forEach((k) => {
      params[k] = queryToString(query[k]);
    });
    return new URLSearchParams(params);
  };

  const {
    data: results,
    error,
    status: pageStatus,
  } = useFetchStatus<SearchRideResult[], Error>(
    isReady ? `/api/rides?${urlSearchParams()}` : null
  );

  if (pageStatus === PageStatus.Idle || pageStatus === PageStatus.Loading) {
    return (
      <div className="prose w-full max-w-full py-7 prose-h3:mt-0">
        <h2>Results</h2>
        <div className="flex flex-col items-center justify-center gap-3">
          <Loading />
        </div>
      </div>
    );
  }

  if (pageStatus === PageStatus.Error) {
    return (
      <div className="prose w-full max-w-full py-7 prose-h3:mt-0">
        <h2>Results</h2>
        {error?.name === "401" ? (
          <div className="flex items-center justify-center">
            <p>
              Please{" "}
              <Link href={`/login?redirect=${pathname}${urlSearchParams()}`}>
                log in
              </Link>
              .
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
      <div className="prose w-full max-w-full py-7 prose-h3:mt-0">
        <h2>Results</h2>

        <div>
          <SearchFilters />
        </div>

        <div className="mt-5 flex w-full flex-col gap-3">
          {results.map((result) => (
            <SearchResult key={result.id} result={result} />
          ))}
        </div>
      </div>
    );
  }
}
