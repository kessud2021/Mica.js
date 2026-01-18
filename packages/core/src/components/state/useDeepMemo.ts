import { useMemo, useRef } from 'react';

const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a == null || b == null) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
};

const useDeepMemo = <T,>(value: T, deps?: any[]): T => {
  const ref = useRef<T>(value);

  return useMemo(() => {
    if (!deepEqual(ref.current, value)) {
      ref.current = value;
    }
    return ref.current;
  }, deps || [value]);
};

export default useDeepMemo;
