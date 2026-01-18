import { lazy as reactLazy } from 'react';
import type { ComponentType } from 'react';

type LazyComponentLoader<T extends ComponentType<any>> = () => Promise<{ default: T }>;

const lazyComponent = <T extends ComponentType<any>>(
  loader: LazyComponentLoader<T>,
): ComponentType<any> => {
  return reactLazy(loader as any);
};

export default lazyComponent;
