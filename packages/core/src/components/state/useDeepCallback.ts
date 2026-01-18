import { useCallback, useRef } from 'react';
import type { DependencyList } from 'react';

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

const useDeepCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList,
): T => {
  const ref = useRef<DependencyList>(deps);

  return useCallback(callback, ref.current) as T;
};

export default useDeepCallback;
