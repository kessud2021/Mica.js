import { useState, useCallback } from 'react';

type UseObjectStateReturn<T extends Record<string, any>> = {
  object: T;
  set: (newObj: T) => void;
  update: (updates: Partial<T>) => void;
  remove: (...keys: (keyof T)[]) => void;
  clear: () => void;
};

const useObjectState = <T extends Record<string, any> = {}>(initialObject: T): UseObjectStateReturn<T> => {
  const [object, setObjectState] = useState<T>(initialObject);

  const set = useCallback((newObj: T) => {
    setObjectState(newObj);
  }, []);

  const update = useCallback((updates: Partial<T>) => {
    setObjectState(obj => ({ ...obj, ...updates }));
  }, []);

  const remove = useCallback((...keys: (keyof T)[]) => {
    setObjectState(obj => {
      const newObj = { ...obj };
      keys.forEach(key => delete newObj[key]);
      return newObj;
    });
  }, []);

  const clear = useCallback(() => {
    setObjectState({} as T);
  }, []);

  return { object, set, update, remove, clear };
};

export default useObjectState;
