import { useState, useCallback } from 'react';

type UseStackReturn<T> = {
  stack: T[];
  push: (item: T) => void;
  pop: () => T | undefined;
  peek: () => T | undefined;
  clear: () => void;
  size: number;
  isEmpty: boolean;
};

const useStack = <T,>(initialStack?: T[]): UseStackReturn<T> => {
  const [stack, setStack] = useState<T[]>(initialStack || []);

  const push = useCallback((item: T) => {
    setStack(s => [...s, item]);
  }, []);

  const pop = useCallback(() => {
    let popped: T | undefined;
    setStack(s => {
      if (s.length === 0) return s;
      [...s].pop();
      popped = s[s.length - 1];
      return s.slice(0, -1);
    });
    return popped;
  }, []);

  const peek = useCallback(() => {
    return stack[stack.length - 1];
  }, [stack]);

  const clear = useCallback(() => {
    setStack([]);
  }, []);

  return { stack, push, pop, peek, clear, size: stack.length, isEmpty: stack.length === 0 };
};

export default useStack;
