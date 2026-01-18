import { createElement as reactCreateElement } from 'react';
import type { ReactNode, ComponentType } from 'react';

const createElement = <P extends Record<string, any> = {}>(
  type: ComponentType<P> | string,
  props?: Partial<P>,
  ...children: ReactNode[]
): ReactNode => {
  return reactCreateElement(type as any, props, ...children);
};

export default createElement;
