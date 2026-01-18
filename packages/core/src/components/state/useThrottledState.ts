import { useState, useRef, useEffect } from 'react';

type UseThrottledStateReturn<T> = [T, (value: T) => void];

const useThrottledState = <T,>(initialValue: T, delay: number = 500): UseThrottledStateReturn<T> => {
  const [value, setValue] = useState(initialValue);
  const [throttledValue, setThrottledValue] = useState(initialValue);
  const lastRanRef = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRanRef.current >= delay) {
        setThrottledValue(value);
        lastRanRef.current = Date.now();
      }
    }, delay - (Date.now() - lastRanRef.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [throttledValue, setValue];
};

export default useThrottledState;
