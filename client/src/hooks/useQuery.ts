import { useState, useEffect, useRef, useCallback } from "react";

interface QueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseQueryParams<T> {
  queryKey: unknown[];
  queryFn: (args: { signal: AbortSignal }) => Promise<T>;
  enabled?: boolean;
  initialData?: T;
}

export function useQuery<T>({
  queryFn,
  queryKey,
  enabled = true,
  initialData,
}: UseQueryParams<T>): QueryResult<T> {
  const [data, setData] = useState<T | null>(initialData ?? null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  // Store latest queryFn to avoid stale closures
  const queryFnRef = useRef(queryFn);
  queryFnRef.current = queryFn;

  const makeRequest = useCallback(async () => {
    abortControllerRef.current?.abort();

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);

    try {
      const result = await queryFnRef.current({
        signal: abortController.signal,
      });

      if (!abortController.signal.aborted) {
        setData(result);
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  const serializedKey = JSON.stringify(queryKey);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    makeRequest();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [serializedKey, enabled, makeRequest]);

  return { data, loading, error, refetch: makeRequest };
}
