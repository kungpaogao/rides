export async function basicFetch(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = new Error(res.statusText);
    error.name = res.status.toString();
    throw error;
  }

  return res.json();
}
