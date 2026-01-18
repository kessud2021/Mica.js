import { useRef, useEffect } from 'react';

type UsePreviousReturn<T> = T | undefined;

const usePrevious2 = <T,>(value: T, isEqual?: (prev: T, curr: T) => boolean): UsePreviousReturn<T> => {
  const ref = useRef<T>();
  const prevRef = useRef<T>();

  useEffect(() => {
    if (!isEqual) {
      prevRef.current = ref.current;
      ref.current = value;
    } else if (!isEqual(ref.current as T, value)) {
      prevRef.current = ref.current;
      ref.current = value;
    }
  }, [value, isEqual]);

  return prevRef.current;
};

export default usePrevious2;
