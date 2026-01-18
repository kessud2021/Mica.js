import { useState, useEffect } from 'react';

type UseDebouncedStateReturn<T> = [T, (value: T) => void];

const useDebouncedState = <T,>(initialValue: T, delay: number = 500): UseDebouncedStateReturn<T> => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, setValue];
};

export default useDebouncedState;
