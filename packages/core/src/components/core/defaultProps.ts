import type { ComponentType } from 'react';

const defaultProps = <P extends Record<string, any> = {}>(
  Component: ComponentType<P>,
  defaults: Partial<P>,
): ComponentType<P> => {
  const component = Component as any;
  component.defaultProps = defaults;
  return Component;
};

export default defaultProps;
