/**
 * Custom React hooks for performance and UX
 */

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Debounce a value - delays updating until user stops typing
 * @param value The value to debounce
 * @param delay Milliseconds to wait before updating (default 300ms)
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Create a debounced callback function
 * @param callback The function to debounce
 * @param delay Milliseconds to wait before executing (default 300ms)
 */
export function useDebouncedCallback<T extends (...args: never[]) => void>(
  callback: T,
  delay = 300
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );
}

/**
 * Create a throttled callback function - limits execution rate
 * @param callback The function to throttle
 * @param delay Minimum milliseconds between executions (default 300ms)
 */
export function useThrottledCallback<T extends (...args: never[]) => void>(
  callback: T,
  delay = 300
): (...args: Parameters<T>) => void {
  const lastCallRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallRef.current;

      if (timeSinceLastCall >= delay) {
        lastCallRef.current = now;
        callbackRef.current(...args);
      } else {
        // Schedule for the end of the throttle period
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          lastCallRef.current = Date.now();
          callbackRef.current(...args);
        }, delay - timeSinceLastCall);
      }
    },
    [delay]
  );
}
