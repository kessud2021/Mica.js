import { useState, useCallback } from 'react';

type UseArrayStateReturn<T> = {
  array: T[];
  push: (item: T) => void;
  remove: (index: number) => void;
  update: (index: number, item: T) => void;
  clear: () => void;
  move: (from: number, to: number) => void;
  insertAt: (index: number, item: T) => void;
};

const useArrayState = <T,>(initialArray: T[] = []): UseArrayStateReturn<T> => {
  const [array, setArray] = useState(initialArray);

  const push = useCallback((item: T) => {
    setArray(arr => [...arr, item]);
  }, []);

  const remove = useCallback((index: number) => {
    setArray(arr => arr.filter((_, i) => i !== index));
  }, []);

  const update = useCallback((index: number, item: T) => {
    setArray(arr => {
      const newArr = [...arr];
      newArr[index] = item;
      return newArr;
    });
  }, []);

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  const move = useCallback((from: number, to: number) => {
    setArray(arr => {
      const newArr = [...arr];
      const [item] = newArr.splice(from, 1);
      newArr.splice(to, 0, item);
      return newArr;
    });
  }, []);

  const insertAt = useCallback((index: number, item: T) => {
    setArray(arr => {
      const newArr = [...arr];
      newArr.splice(index, 0, item);
      return newArr;
    });
  }, []);

  return { array, push, remove, update, clear, move, insertAt };
};

export default useArrayState;
