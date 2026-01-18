import type { ComponentType } from 'react';

const displayName = <P extends Record<string, any> = {}>(
  Component: ComponentType<P>,
  name: string,
): ComponentType<P> => {
  const component = Component as any;
  component.displayName = name;
  return Component;
};

export default displayName;
