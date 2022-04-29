import { supabase } from "./supabaseClient";

/**
 * Fetch wrapper that throws errors on non-200 responses
 */
export async function basicFetchRes(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = new Error(res.statusText);
    error.name = res.status.toString();
    throw error;
  }

  return res;
}

/**
 * Fetch wrapper that throws errors on non-200 responses and returns json
 * response
 */
export async function basicFetch(input: RequestInfo, init?: RequestInit) {
  const res = await basicFetchRes(input, init);

  return res.json();
}

/**
 * `basicFetch` with auth headers added using supabase session
 */
export async function basicFetchWithAuth(
  input: RequestInfo,
  init?: RequestInit
) {
  if (!supabase.auth.session()?.access_token) {
    const error = new Error("Unauthorized");
    error.name = "401";
    throw error;
  }

  const initWithAuth = {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: supabase.auth.session()?.access_token!,
    },
  };

  return basicFetch(input, initWithAuth);
}

/**
 * `basicFetchRes` wrapper to make POST requests
 */
export async function basicFetchPostRes(input: RequestInfo, data: any) {
  return basicFetchRes(input, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

/**
 * `basicFetch` wrapper to make POST requests
 */
export async function basicFetchPost(input: RequestInfo, data: any) {
  return basicFetch(input, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

/**
 * `basicFetchWithAuth` wrapper to make POST requests
 */
export async function basicFetchPostWithAuth(input: RequestInfo, data: any) {
  return basicFetchWithAuth(input, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
