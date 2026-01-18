import { useImperativeHandle as reactUseImperativeHandle } from 'react';
import type { MutableRefObject, DependencyList } from 'react';

const useImperativeHandle = <T, R extends T>(
  ref: MutableRefObject<T> | ((instance: T) => void),
  createHandle: () => R,
  deps?: DependencyList,
): void => {
  reactUseImperativeHandle(ref as any, createHandle, deps);
};

export default useImperativeHandle;
