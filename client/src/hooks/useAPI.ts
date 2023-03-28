import useSWR from "swr";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

export const useAPI = <T = any, K = any>(
  path: string,
  method: Method,
  body?: K
) => useSWR<T>(path, (path) => apiFetch<T, K>(path, method, body));

export async function apiFetch<T = any, K = any>(
  path: string,
  method: Method,
  body?: K
): Promise<T> {
  const res = await fetch(`${import.meta.env.VITE_PUBLIC_API_URL}/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body && JSON.stringify(body),
  });

  return res.json() as T;
}
