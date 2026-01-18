import { Children } from 'react';
import type { ReactNode, ReactElement } from 'react';

type ChildrenProcessor = (child: ReactNode, index: number) => ReactNode;

const componentChildren = (children: ReactNode) => {
  return {
    count: Children.count(children),
    forEach: (callback: ChildrenProcessor) => {
      Children.forEach(children, callback);
    },
    map: (callback: ChildrenProcessor) => {
      return Children.map(children, callback);
    },
    toArray: () => {
      return Children.toArray(children);
    },
    only: () => {
      return Children.only(children);
    },
  };
};

export default componentChildren;
