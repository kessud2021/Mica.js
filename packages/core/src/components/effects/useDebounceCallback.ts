import { useCallback, useRef } from 'react';

const useDebounceCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 500,
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback as T;
};

export default useDebounceCallback;
