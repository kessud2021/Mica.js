import { useState, useCallback } from 'react';

type UseSuspenseReturn = {
  suspend: <T,>(promise: Promise<T>) => T;
  reset: () => void;
};

const useSuspense = (): UseSuspenseReturn => {
  const [suspense, setSuspense] = useState<Promise<any> | null>(null);

  const suspend = useCallback(<T,>(promise: Promise<T>) => {
    setSuspense(promise);
    throw promise;
  }, []);

  const reset = useCallback(() => {
    setSuspense(null);
  }, []);

  return { suspend, reset };
};

export default useSuspense;
