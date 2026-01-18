type EffectCleanupFunction = () => void;

type EffectWithCleanup = {
  effect: () => EffectCleanupFunction | void;
  cleanup: () => void;
};

const effectCleanup = (
  cleanupFn: EffectCleanupFunction | void,
): { cleanup: () => void; register: (fn: EffectCleanupFunction) => void } => {
  const cleanupFunctions: Set<EffectCleanupFunction> = new Set();

  if (cleanupFn) {
    cleanupFunctions.add(cleanupFn);
  }

  return {
    cleanup: () => {
      cleanupFunctions.forEach(fn => {
        try {
          fn();
        } catch (error) {
          console.error('Error during effect cleanup:', error);
        }
      });
      cleanupFunctions.clear();
    },
    register: (fn: EffectCleanupFunction) => {
      cleanupFunctions.add(fn);
    },
  };
};

export default effectCleanup;
