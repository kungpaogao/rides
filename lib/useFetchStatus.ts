import useSWR from "swr";
import PageStatus from "../types/PageStatus";

export function useFetchStatus(request: RequestInfo) {
  const fetcher = (request: RequestInfo) =>
    fetch(request).then((res) => res.json());
  const { data, error } = useSWR(request, fetcher);

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
