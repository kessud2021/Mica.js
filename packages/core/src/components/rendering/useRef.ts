import { useRef as reactUseRef } from 'react';
import type { MutableRefObject } from 'react';

const useRef = <T,>(initialValue: T): MutableRefObject<T> => {
  return reactUseRef(initialValue);
};

export default useRef;
