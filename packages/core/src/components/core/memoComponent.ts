import { memo as reactMemo } from 'react';
import type { ComponentType } from 'react';

type PropsAreEqual<P = any> = (prevProps: P, nextProps: P) => boolean;

const memoComponent = <P extends Record<string, any> = {}>(
  component: ComponentType<P>,
  arePropsEqual?: PropsAreEqual<P>,
): ComponentType<P> => {
  return reactMemo(component, arePropsEqual);
};

export default memoComponent;
