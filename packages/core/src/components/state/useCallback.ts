import { useCallback as reactUseCallback } from 'react';
import type { DependencyList } from 'react';

const useCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList,
): T => {
  return reactUseCallback(callback, deps) as T;
};

export default useCallback;
