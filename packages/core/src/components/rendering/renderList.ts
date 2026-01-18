import type { ReactNode, Key } from 'react';

type RenderListOptions<T> = {
  renderItem: (item: T, index: number) => ReactNode;
  getKey?: (item: T, index: number) => Key;
  empty?: ReactNode;
};

const renderList = <T,>(items: T[], options: RenderListOptions<T>): ReactNode[] | ReactNode => {
  if (items.length === 0) {
    return options.empty || null;
  }

  return items.map((item, index) => {
    return options.renderItem(item, index);
  });
};

export default renderList;
