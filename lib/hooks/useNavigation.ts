import { useRouter } from "next/router";
import { useMemo } from "react";
import { queryToString } from "../queryToString";

export function useNavigation() {
  const { pathname, query } = useRouter();

  const urlSearchParams = useMemo(() => {
    let params: any = {};
    Object.keys(query).forEach((k) => {
      params[k] = queryToString(query[k]);
    });
    return new URLSearchParams(params);
  }, [query]);

  const redirect = useMemo(() => {
    const unencodedRedirect = `${pathname}?${urlSearchParams}`;
    return encodeURIComponent(unencodedRedirect);
  }, [urlSearchParams]);

  return { urlSearchParams, redirect };
}
