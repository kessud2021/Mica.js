import type { ComponentType, ReactNode } from 'react';

type Enhancement<P> = (Component: ComponentType<P>) => ComponentType<P>;

const enhanceComponent = <P extends Record<string, any> = {}>(
  Component: ComponentType<P>,
  ...enhancements: Enhancement<P>[]
): ComponentType<P> => {
  return enhancements.reduce((acc, enhancement) => enhancement(acc), Component);
};

export default enhanceComponent;
