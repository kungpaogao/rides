import PageStatus from "../types/PageStatus";
import { useFetchStatus } from "../lib/useFetchStatus";
import { useRouter } from "next/router";
import Loading from "../components/Loading";
import { queryToString } from "../lib/queryToString";
import SearchResult from "../components/SearchResult";
import SearchFilters from "../components/SearchFilters";
import { SearchRideResult } from "../types/SearchRide";

export default function Search() {
  const { push, pathname, query } = useRouter();

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
    `/api/rides?${urlSearchParams()}`
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
    if (error?.name === "401") {
      push(`/login?redirect=${pathname}`);
    }

    return (
      <div className="prose w-full max-w-full py-7 prose-h3:mt-0">
        <h2>Results</h2>
        <div className="flex flex-col items-center justify-center gap-3">
          {error?.message || "Something went wrong :("}
        </div>
      </div>
    );
  }

  if (pageStatus === PageStatus.Success && results) {
    return (
      <div className="prose w-full max-w-full py-7 prose-h3:mt-0">
        <h2>Results</h2>

        <div>
          <h3>Filters</h3>
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
