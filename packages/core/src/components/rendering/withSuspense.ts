import { Suspense } from 'react';
import type { ComponentType, ReactNode } from 'react';

type WithSuspenseOptions = {
  fallback: ReactNode;
};

const withSuspense = <P extends Record<string, any> = {}>(
  Component: ComponentType<P>,
  options: WithSuspenseOptions,
): ComponentType<P> => {
  return (props: P) => {
    return {
      $$typeof: Symbol.for('react.element'),
      type: Suspense,
      props: {
        fallback: options.fallback,
        children: { $$typeof: Symbol.for('react.element'), type: Component, props },
      },
    };
  };
};

export default withSuspense;
