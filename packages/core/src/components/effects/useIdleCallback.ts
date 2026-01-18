import { useEffect, useRef } from 'react';

const useIdleCallback = (callback: () => void, options?: IdleRequestOptions): void => {
  const idRef = useRef<number>();

  useEffect(() => {
    if (typeof requestIdleCallback === 'undefined') {
      const timer = setTimeout(callback, 0);
      return () => clearTimeout(timer);
    }

    idRef.current = requestIdleCallback(callback, options);

    return () => {
      if (idRef.current) {
        cancelIdleCallback(idRef.current);
      }
    };
  }, [callback, options]);
};

export default useIdleCallback;
