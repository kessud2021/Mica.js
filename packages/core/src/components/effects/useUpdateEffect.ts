import { useEffect, useRef } from 'react';
import type { DependencyList, EffectCallback } from 'react';

const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList): void => {
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    return effect();
  }, deps);
};

export default useUpdateEffect;
