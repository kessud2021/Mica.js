import { createContext } from 'react';

type ContextValue<T = any> = T | undefined;

const componentContext = <T = any>(defaultValue?: T) => {
  return createContext<ContextValue<T>>(defaultValue);
};

export default componentContext;
