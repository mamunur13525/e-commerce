import { useEffect, useState } from "react";

/**
 * Custom hook to debounce any value
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up the timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes before delay expires
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook to debounce URL search params changes
 * Useful for filter changes that update query params
 * @param searchParams - URLSearchParams object
 * @param delay - Delay in milliseconds (default: 800ms)
 * @returns Debounced query string
 */
export function useDebounceSearchParams(searchParams: URLSearchParams, delay: number = 800): string {
  const queryString = searchParams.toString();
  const debouncedQuery = useDebounce(queryString, delay);
  return debouncedQuery;
}

/**
 * Hook to debounce an array of values (like price range)
 * @param values - Array of values to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Debounced array of values
 */
export function useDebounceArray(values: readonly number[], delay: number = 500): readonly number[] {
  const [debouncedValues, setDebouncedValues] = useState(values);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValues(values);
    }, delay);

    return () => clearTimeout(handler);
  }, [values, delay]);

  return debouncedValues;
}
