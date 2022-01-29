export function queryToString(query?: string | string[]) {
  if (!query) return "";
  return Array.isArray(query) ? query.join(",") : query;
}
