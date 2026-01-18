import { createContext, useContext } from 'react';
import type { Context, ReactNode, PropsWithChildren } from 'react';

type ContextHelper<T> = {
  Context: Context<T | undefined>;
  Provider: (props: PropsWithChildren<{ value: T }>) => ReactNode;
  useContext: () => T | undefined;
};

const contextHelper = <T,>(defaultValue?: T): ContextHelper<T> => {
  const Context = createContext<T | undefined>(defaultValue);

  const Provider = ({ value, children }: PropsWithChildren<{ value: T }>) => {
    return { $$typeof: Symbol.for('react.element'), type: Context.Provider, props: { value, children } };
  };

  const useCtx = () => {
    return useContext(Context);
  };

  return { Context, Provider, useContext: useCtx };
};

export default contextHelper;
