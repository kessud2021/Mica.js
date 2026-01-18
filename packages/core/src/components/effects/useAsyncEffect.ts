import { useEffect } from 'react';
import type { DependencyList } from 'react';

const useAsyncEffect = (
  asyncEffect: () => Promise<void | (() => void)>,
  deps?: DependencyList,
): void => {
  useEffect(() => {
    let mounted = true;
    const executeAsync = async () => {
      try {
        const cleanup = await asyncEffect();
        if (mounted && typeof cleanup === 'function') {
          return cleanup;
        }
      } catch (error) {
        if (mounted) {
          console.error('Error in async effect:', error);
        }
      }
    };

    let cleanupFn: void | (() => void);
    const promise = executeAsync().then(result => {
      cleanupFn = result;
    });

    return () => {
      mounted = false;
      if (typeof cleanupFn === 'function') {
        cleanupFn();
      }
    };
  }, deps);
};

export default useAsyncEffect;
