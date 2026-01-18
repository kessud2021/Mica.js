import { cloneElement as reactCloneElement } from 'react';
import type { ReactElement } from 'react';

const cloneElement = <P extends Record<string, any> = {}>(
  element: ReactElement<P>,
  props?: Partial<P>,
  ...children: any[]
): ReactElement<P> => {
  return reactCloneElement(element, props as P, ...children);
};

export default cloneElement;
