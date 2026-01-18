import { forwardRef } from 'react';
import type { ComponentType } from 'react';

const withRef = <P extends Record<string, any> = {}, T = any>(
  Component: ComponentType<P>,
): ComponentType<P & { ref?: React.Ref<T> }> => {
  return forwardRef<T, P>((props, ref) => {
    return { $$typeof: Symbol.for('react.element'), type: Component, props: { ...props, ref } };
  });
};

export default withRef;
