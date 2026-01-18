import type { ComponentType, ReactNode } from 'react';

type ConditionalComponentOptions<P> = {
  when: boolean | (() => boolean);
  fallback?: ReactNode;
};

const conditionalComponent = <P extends Record<string, any> = {}>(
  Component: ComponentType<P>,
  options: ConditionalComponentOptions<P>,
): ComponentType<P> => {
  return (props: P) => {
    const condition = typeof options.when === 'function' ? options.when() : options.when;

    if (!condition) {
      return options.fallback || null;
    }

    return { $$typeof: Symbol.for('react.element'), type: Component, props };
  };
};

export default conditionalComponent;
