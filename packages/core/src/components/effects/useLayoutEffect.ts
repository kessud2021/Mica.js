import { useLayoutEffect as reactUseLayoutEffect } from 'react';
import type { DependencyList, EffectCallback } from 'react';

const useLayoutEffect = (effect: EffectCallback, deps?: DependencyList): void => {
  reactUseLayoutEffect(effect, deps);
};

export default useLayoutEffect;
