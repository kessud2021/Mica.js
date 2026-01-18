import type { ComponentType, ReactNode } from 'react';

type ComponentFactoryOptions<P> = {
  displayName?: string;
  defaultProps?: Partial<P>;
  wrapped?: (Component: ComponentType<P>) => ComponentType<P>;
};

const componentFactory = <P extends Record<string, any> = {}>(
  render: (props: P) => ReactNode,
  options?: ComponentFactoryOptions<P>,
): ComponentType<P> => {
  const Component = (props: P) => render(props);

  if (options?.displayName) {
    (Component as any).displayName = options.displayName;
  }

  if (options?.defaultProps) {
    (Component as any).defaultProps = options.defaultProps;
  }

  if (options?.wrapped) {
    return options.wrapped(Component);
  }

  return Component;
};

export default componentFactory;
