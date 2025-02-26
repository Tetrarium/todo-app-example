import { useCallback, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string, options?: RequestInit) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  
  const fetchData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (body?: any, customOptions?: RequestInit) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const response = await fetch(url, {
          ...options,
          ...customOptions,
          body: body ? JSON.stringify(body) : undefined,
          headers: {
            "Content-Type": "application/json",
            ...options?.headers,
            ...customOptions?.headers,
          }
        })

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        new Promise((resolve) => setTimeout(
          resolve,
          1000
        ))
        .then(() => {
          setState({ data, loading: false, error: null });
        });
        return data
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Something went wrong',
        })
      }
    },
    [url, options],
  )

  return { ...state, fetchData };
}