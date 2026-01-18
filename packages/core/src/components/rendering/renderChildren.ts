import { Children } from 'react';
import type { ReactNode } from 'react';

type ChildrenRenderer = (child: ReactNode, index: number) => ReactNode;

const renderChildren = (children: ReactNode, renderer: ChildrenRenderer): ReactNode[] => {
  return Children.map(children, renderer) || [];
};

export default renderChildren;
