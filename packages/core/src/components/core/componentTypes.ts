import type { ReactNode, Context } from 'react';

type ComponentProps = Record<string, any>;

type ComponentType<P = ComponentProps> = (props: P) => ReactNode;

type FunctionComponent<P = ComponentProps> = ComponentType<P> & {
  displayName?: string;
  defaultProps?: Partial<P>;
  contextTypes?: Record<string, any>;
  propTypes?: Record<string, any>;
};

type VoidComponent = ComponentType<{}>;

type ClassComponent<P = ComponentProps> = new (props: P) => {
  render(): ReactNode;
};

type AnyComponent<P = ComponentProps> = FunctionComponent<P> | ClassComponent<P>;

const componentTypes = {
  isComponentType: (type: any): type is ComponentType => typeof type === 'function',
  isFunctionComponent: (type: any): type is FunctionComponent => {
    return typeof type === 'function' && !type.prototype?.isReactComponent;
  },
  isClassComponent: (type: any): type is ClassComponent => {
    return typeof type === 'function' && type.prototype?.isReactComponent;
  },
};

export default componentTypes;

export type {
  ComponentProps,
  ComponentType,
  FunctionComponent,
  VoidComponent,
  ClassComponent,
  AnyComponent,
};
