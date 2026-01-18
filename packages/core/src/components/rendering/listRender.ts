import type { ReactNode, Key } from 'react';

type ListRenderer<T> = (item: T, index: number) => ReactNode;

const listRender = <T,>(items: T[], renderer: ListRenderer<T>, getKey?: (item: T, index: number) => Key): ReactNode[] => {
  return items.map((item, index) => {
    const key = getKey ? getKey(item, index) : index;
    const element = renderer(item, index);
    return element;
  });
};

export default listRender;
