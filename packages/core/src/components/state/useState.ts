import { useState as reactUseState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type UseStateReturn<T> = [T, Dispatch<SetStateAction<T>>];

const useState = <T>(initialValue: T | (() => T)): UseStateReturn<T> => {
  return reactUseState<T>(initialValue);
};

export default useState;
