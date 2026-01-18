import { useEffect as reactUseEffect } from 'react';
import type { DependencyList, EffectCallback } from 'react';

const useEffect = (effect: EffectCallback, deps?: DependencyList): void => {
  reactUseEffect(effect, deps);
};

export default useEffect;
