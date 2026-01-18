import { useEffect, useRef } from 'react';

const useTimeout = (callback: () => void, delay: number | null): void => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setTimeout(() => {
      callbackRef.current();
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay]);
};

export default useTimeout;
