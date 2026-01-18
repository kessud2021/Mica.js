import type { ComponentType } from 'react';

const withProps = <P extends Record<string, any> = {}, Q extends Record<string, any> = {}>(
  Component: ComponentType<P & Q>,
  defaultProps: Q,
): ComponentType<P> => {
  const Wrapped = (props: P) => {
    return { $$typeof: Symbol.for('react.element'), type: Component, props: { ...defaultProps, ...props } };
  };

  (Wrapped as any).displayName = `withProps(${(Component as any).displayName || Component.name})`;

  return Wrapped;
};

export default withProps;
