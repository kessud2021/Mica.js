import { Suspense, lazy } from 'react';
import type { ReactNode, ComponentType } from 'react';

type LazyLoadOptions = {
  fallback?: ReactNode;
};

const lazyLoad = <T extends ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
  options?: LazyLoadOptions,
): ReactNode => {
  const Component = lazy(loader);

  return {
    $$typeof: Symbol.for('react.element'),
    type: Suspense,
    props: {
      fallback: options?.fallback || null,
      children: { $$typeof: Symbol.for('react.element'), type: Component, props: {} },
    },
  };
};

export default lazyLoad;
