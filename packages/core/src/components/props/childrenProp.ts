import { Children } from 'react';
import type { ReactNode } from 'react';

type ChildrenPropInfo = {
  count: number;
  isEmpty: boolean;
  isFunction: boolean;
  isString: boolean;
};

const childrenProp = (children: ReactNode): ChildrenPropInfo => {
  const count = Children.count(children);

  return {
    count,
    isEmpty: count === 0,
    isFunction: typeof children === 'function',
    isString: typeof children === 'string',
  };
};

export default childrenProp;
