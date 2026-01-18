import { useRef } from 'react';
import type { RefObject, MutableRefObject } from 'react';

type ComponentRefType<T = any> = RefObject<T> | MutableRefObject<T>;

const componentRef = <T = any>(initialValue?: T): ComponentRefType<T> => {
  return useRef<T>(initialValue as T);
};

export default componentRef;
