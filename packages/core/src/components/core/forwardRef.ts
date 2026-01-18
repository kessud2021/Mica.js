import { forwardRef as reactForwardRef } from 'react';
import type { ForwardRefRenderFunction, RefAttributes } from 'react';

type ForwardRefFunction<T, P> = ForwardRefRenderFunction<T, P>;

const forwardRef = <T, P extends Record<string, any> = {}>(
  component: ForwardRefFunction<T, P>,
) => {
  return reactForwardRef(component);
};

export default forwardRef;

export type { ForwardRefFunction };
