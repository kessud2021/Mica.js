import { useRef, useCallback } from 'react';
import type { MutableRefObject } from 'react';

type RefHelper<T> = {
  ref: MutableRefObject<T | null>;
  current: T | null;
  set: (value: T | null) => void;
  clear: () => void;
  isSet: () => boolean;
};

const refHelper = <T,>(): RefHelper<T> => {
  const ref = useRef<T | null>(null);

  const set = useCallback((value: T | null) => {
    ref.current = value;
  }, []);

  const clear = useCallback(() => {
    ref.current = null;
  }, []);

  const isSet = useCallback(() => {
    return ref.current !== null;
  }, []);

  return {
    ref,
    current: ref.current,
    set,
    clear,
    isSet,
  };
};

export default refHelper;
