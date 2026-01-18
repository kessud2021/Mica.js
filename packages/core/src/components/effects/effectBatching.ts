import { flushSync } from 'react-dom';

type BatchedEffect = () => void | (() => void);

type EffectBatch = {
  enqueue: (effect: BatchedEffect) => void;
  flush: () => void;
  pending: number;
};

const effectBatching = (): EffectBatch => {
  const effects: BatchedEffect[] = [];
  const cleanups: Array<() => void> = [];

  return {
    enqueue: (effect: BatchedEffect) => {
      effects.push(effect);
    },
    flush: () => {
      flushSync(() => {
        effects.forEach(effect => {
          try {
            const cleanup = effect();
            if (typeof cleanup === 'function') {
              cleanups.push(cleanup);
            }
          } catch (error) {
            console.error('Error during batched effect execution:', error);
          }
        });
      });
      effects.length = 0;
    },
    pending: effects.length,
  };
};

export default effectBatching;
