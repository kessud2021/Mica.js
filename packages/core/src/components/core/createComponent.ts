import type { ReactNode, PropsWithChildren } from 'react';

type ComponentFunction<P = {}> = (props: PropsWithChildren<P>) => ReactNode;

type ComponentOptions = {
  displayName?: string;
};

const createComponent = <P extends {} = {}>(
  component: ComponentFunction<P>,
  options?: ComponentOptions,
): ComponentFunction<P> => {
  const fn = component as any;
  if (options?.displayName) {
    fn.displayName = options.displayName;
  }
  return fn;
};

export default createComponent;
