import { useDeferredValue as reactUseDeferredValue } from 'react';

const useDeferredValue = <T,>(value: T): T => {
  return reactUseDeferredValue(value);
};

export default useDeferredValue;
