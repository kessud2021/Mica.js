import { createContext, useContext } from 'react';
import type { Context, ReactNode, PropsWithChildren } from 'react';

type CreateContext2Return<T> = {
  Provider: (props: PropsWithChildren<{ value: T }>) => ReactNode;
  useContext: () => T | undefined;
  Context: Context<T | undefined>;
};

const createContext2 = <T,>(defaultValue?: T): CreateContext2Return<T> => {
  const Context = createContext<T | undefined>(defaultValue);

  const Provider = ({ value, children }: PropsWithChildren<{ value: T }>) => {
    return { $$typeof: Symbol.for('react.element'), type: Context.Provider, props: { value, children } };
  };

  const useCtx = () => useContext(Context);

  return { Provider, useContext: useCtx, Context };
};

export default createContext2;
