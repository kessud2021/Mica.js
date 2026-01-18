import { useState, useCallback } from 'react';

type CounterActions = {
  increment: (amount?: number) => void;
  decrement: (amount?: number) => void;
  reset: () => void;
  set: (value: number) => void;
  add: (value: number) => void;
  subtract: (value: number) => void;
};

const useCounter2 = (initialValue: number = 0): [number, CounterActions] => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback((amount: number = 1) => {
    setCount(c => c + amount);
  }, []);

  const decrement = useCallback((amount: number = 1) => {
    setCount(c => c - amount);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const set = useCallback((value: number) => {
    setCount(value);
  }, []);

  const add = useCallback((value: number) => {
    setCount(c => c + value);
  }, []);

  const subtract = useCallback((value: number) => {
    setCount(c => c - value);
  }, []);

  return [count, { increment, decrement, reset, set, add, subtract }];
};

export default useCounter2;
