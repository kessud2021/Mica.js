import { useState, useCallback } from 'react';

type UseArrayReturn<T> = {
  array: T[];
  push: (item: T) => void;
  pop: () => void;
  shift: () => void;
  unshift: (item: T) => void;
  concat: (items: T[]) => void;
  slice: (start?: number, end?: number) => void;
  splice: (start: number, deleteCount?: number, ...items: T[]) => void;
  reverse: () => void;
  sort: (compareFn?: (a: T, b: T) => number) => void;
  clear: () => void;
  set: (newArray: T[]) => void;
};

const useArray = <T,>(initialArray: T[] = []): UseArrayReturn<T> => {
  const [array, setArray] = useState<T[]>(initialArray);

  const push = useCallback((item: T) => {
    setArray(a => [...a, item]);
  }, []);

  const pop = useCallback(() => {
    setArray(a => a.slice(0, -1));
  }, []);

  const shift = useCallback(() => {
    setArray(a => a.slice(1));
  }, []);

  const unshift = useCallback((item: T) => {
    setArray(a => [item, ...a]);
  }, []);

  const concat = useCallback((items: T[]) => {
    setArray(a => [...a, ...items]);
  }, []);

  const slice = useCallback((start?: number, end?: number) => {
    setArray(a => a.slice(start, end));
  }, []);

  const splice = useCallback((start: number, deleteCount?: number, ...items: T[]) => {
    setArray(a => {
      const newArray = [...a];
      newArray.splice(start, deleteCount, ...items);
      return newArray;
    });
  }, []);

  const reverse = useCallback(() => {
    setArray(a => [...a].reverse());
  }, []);

  const sort = useCallback((compareFn?: (a: T, b: T) => number) => {
    setArray(a => [...a].sort(compareFn));
  }, []);

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  const set = useCallback((newArray: T[]) => {
    setArray(newArray);
  }, []);

  return {
    array,
    push,
    pop,
    shift,
    unshift,
    concat,
    slice,
    splice,
    reverse,
    sort,
    clear,
    set,
  };
};

export default useArray;
