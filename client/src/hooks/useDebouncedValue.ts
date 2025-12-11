import { useState, useEffect, useRef } from "react";

export function useDebouncedValue<T>(value: T, wait: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    const timeout = setTimeout(() => setDebouncedValue(value), wait);
    return () => clearTimeout(timeout);
  }, [value, wait]);

  return debouncedValue;
}
