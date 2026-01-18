import { flushSync } from 'react-dom';

type BatchCallback = () => void;

type BatchUpdateResult = {
  pending: number;
  enqueue: (callback: BatchCallback) => void;
  flush: () => void;
};

const batchUpdates = (): BatchUpdateResult => {
  const callbacks: BatchCallback[] = [];

  return {
    pending: callbacks.length,
    enqueue: (callback: BatchCallback) => {
      callbacks.push(callback);
    },
    flush: () => {
      flushSync(() => {
        callbacks.forEach(callback => {
          try {
            callback();
          } catch (error) {
            console.error('Error in batched update:', error);
          }
        });
      });
      callbacks.length = 0;
    },
  };
};

export default batchUpdates;
