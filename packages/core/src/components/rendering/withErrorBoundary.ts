import type { ComponentType, ReactNode } from 'react';

type WithErrorBoundaryOptions = {
  fallback: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error) => void;
};

const withErrorBoundary = <P extends Record<string, any> = {}>(
  Component: ComponentType<P>,
  options: WithErrorBoundaryOptions,
): ComponentType<P> => {
  return (props: P) => {
    return {
      $$typeof: Symbol.for('react.element'),
      type: Component,
      props,
    };
  };
};

export default withErrorBoundary;
