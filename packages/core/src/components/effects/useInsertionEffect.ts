import { useInsertionEffect as reactUseInsertionEffect } from 'react';
import type { DependencyList, EffectCallback } from 'react';

const useInsertionEffect = (effect: EffectCallback, deps?: DependencyList): void => {
  reactUseInsertionEffect(effect, deps);
};

export default useInsertionEffect;
