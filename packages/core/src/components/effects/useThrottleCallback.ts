import { useCallback, useRef } from 'react';

const useThrottleCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 500,
): T => {
  const lastRanRef = useRef(0);
  const pendingRef = useRef<NodeJS.Timeout>();

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRanRef.current;

      if (timeSinceLastRun >= delay) {
        callback(...args);
        lastRanRef.current = now;
        if (pendingRef.current) {
          clearTimeout(pendingRef.current);
        }
      } else {
        if (pendingRef.current) {
          clearTimeout(pendingRef.current);
        }

        pendingRef.current = setTimeout(() => {
          callback(...args);
          lastRanRef.current = Date.now();
        }, delay - timeSinceLastRun);
      }
    },
    [callback, delay],
  );

  return throttledCallback as T;
};

export default useThrottleCallback;
