import type { ComponentType } from 'react';

type PropMapper<T extends Record<string, any>, P extends Record<string, any>> = (
  props: T,
) => P;

const mapProps = <T extends Record<string, any>, P extends Record<string, any>>(
  Component: ComponentType<P>,
  mapper: PropMapper<T, P>,
): ComponentType<T> => {
  return (props: T) => {
    const mappedProps = mapper(props);
    return { $$typeof: Symbol.for('react.element'), type: Component, props: mappedProps };
  };
};

export default mapProps;
