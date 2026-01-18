import type { ReactNode } from 'react';

type IncrementalRenderOptions = {
  batchSize?: number;
  onBatchComplete?: (batchIndex: number) => void;
};

const incrementalRender = <T,>(
  items: T[],
  renderer: (item: T, index: number) => ReactNode,
  options?: IncrementalRenderOptions,
): AsyncIterable<ReactNode[]> => {
  const batchSize = options?.batchSize || 10;

  return {
    async *[Symbol.asyncIterator]() {
      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const renderedBatch = batch.map((item, index) => renderer(item, i + index));
        yield renderedBatch;
        if (options?.onBatchComplete) {
          options.onBatchComplete(Math.floor(i / batchSize));
        }
      }
    },
  };
};

export default incrementalRender;
