import { useState, useCallback } from 'react';

type UseSetReturn<T> = {
  set: Set<T>;
  add: (value: T) => void;
  delete: (value: T) => boolean;
  has: (value: T) => boolean;
  clear: () => void;
  size: number;
};

const useSet = <T,>(initialSet?: Set<T> | T[]): UseSetReturn<T> => {
  const [set, setSetState] = useState<Set<T>>(() => {
    if (Array.isArray(initialSet)) {
      return new Set(initialSet);
    }
    return new Set(initialSet);
  });

  const add = useCallback((value: T) => {
    setSetState(s => new Set(s).add(value));
  }, []);

  const deleteValue = useCallback((value: T) => {
    const newSet = new Set(set);
    const result = newSet.delete(value);
    setSetState(newSet);
    return result;
  }, [set]);

  const has = useCallback((value: T) => {
    return set.has(value);
  }, [set]);

  const clear = useCallback(() => {
    setSetState(new Set());
  }, []);

  return { set, add, delete: deleteValue, has, clear, size: set.size };
};

export default useSet;
