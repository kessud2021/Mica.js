import { useRef as reactUseRef } from 'react';
import type { RefObject, MutableRefObject } from 'react';

const useRef = <T = any>(initialValue: T): MutableRefObject<T> => {
  return reactUseRef<T>(initialValue);
};

export default useRef;
