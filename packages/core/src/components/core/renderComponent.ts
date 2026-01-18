import type { ReactNode } from 'react';

type RenderOptions = {
  fallback?: ReactNode;
  wrapper?: (children: ReactNode) => ReactNode;
};

const renderComponent = (
  component: ReactNode,
  options?: RenderOptions,
): ReactNode => {
  if (!component && options?.fallback) {
    return options.fallback;
  }

  if (options?.wrapper) {
    return options.wrapper(component);
  }

  return component;
};

export default renderComponent;
