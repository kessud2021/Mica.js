import { useEffect, useRef } from 'react';

const useRaf = (callback: (timestamp: DOMHighResTimeStamp) => void, enabled: boolean = true): void => {
  const idRef = useRef<number>();

  useEffect(() => {
    if (!enabled) return;

    const raf = (timestamp: DOMHighResTimeStamp) => {
      callback(timestamp);
      idRef.current = requestAnimationFrame(raf);
    };

    idRef.current = requestAnimationFrame(raf);

    return () => {
      if (idRef.current) {
        cancelAnimationFrame(idRef.current);
      }
    };
  }, [callback, enabled]);
};

export default useRaf;
