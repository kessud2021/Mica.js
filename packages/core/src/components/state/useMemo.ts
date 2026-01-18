import { useMemo as reactUseMemo } from 'react';
import type { DependencyList } from 'react';

const useMemo = <T>(factory: () => T, deps: DependencyList): T => {
  return reactUseMemo(factory, deps);
};

export default useMemo;
