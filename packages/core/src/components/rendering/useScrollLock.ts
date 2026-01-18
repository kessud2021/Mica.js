import { useEffect, useCallback } from 'react';

const useScrollLock = (locked: boolean = true): void => {
  useEffect(() => {
    if (!locked) return;

    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalOverflow;
    };
  }, [locked]);
};

export default useScrollLock;
