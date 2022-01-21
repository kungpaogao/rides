import useSWR from "swr";
import PageStatus from "../types/PageStatus";
import { basicFetchWithAuth } from "./basicFetch";

export function useFetchStatus<T>(request: RequestInfo) {
  const { data, error } = useSWR<T>(request, basicFetchWithAuth);

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
