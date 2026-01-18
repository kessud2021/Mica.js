import { useState, useCallback } from 'react';

type UseObjectReturn<T extends Record<string, any>> = {
  object: T;
  set: (newObj: T) => void;
  patch: (updates: Partial<T>) => void;
  reset: () => void;
};

const useObject = <T extends Record<string, any> = {}>(initialObject: T): UseObjectReturn<T> => {
  const [object, setObjectState] = useState<T>(initialObject);

  const set = useCallback((newObj: T) => {
    setObjectState(newObj);
  }, []);

  const patch = useCallback((updates: Partial<T>) => {
    setObjectState(obj => ({ ...obj, ...updates }));
  }, []);

  const reset = useCallback(() => {
    setObjectState(initialObject);
  }, [initialObject]);

  return { object, set, patch, reset };
};

export default useObject;
