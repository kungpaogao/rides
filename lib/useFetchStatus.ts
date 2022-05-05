import useSWR from "swr";
import PageStatus from "../types/PageStatus";
import { basicFetchWithAuth } from "./basicFetch";

export function useFetchStatus<T, E>(request: RequestInfo | null) {
  const { data, error } = useSWR<T, E>(request, basicFetchWithAuth, {
    onErrorRetry: (error: any, { retryCount }: any) => {
      // do not retry on 403, 404
      if (error.name === "403" || error.name === "404") {
        return;
      }

      if (retryCount >= 5) return;
    },
    // TODO: could abstract 401 redirect to here
  });

  let status;
  if (!error && !data) {
    status = PageStatus.Loading;
  } else if (error) {
    status = PageStatus.Error;
  } else if (data) {
    status = PageStatus.Success;
  } else {
    status = PageStatus.Idle;
  }

  return {
    data,
    error,
    status,
  };
}
