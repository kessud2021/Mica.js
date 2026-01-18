import { useState, useCallback } from 'react';

type UseQueueReturn<T> = {
  queue: T[];
  enqueue: (item: T) => void;
  dequeue: () => T | undefined;
  peek: () => T | undefined;
  clear: () => void;
  size: number;
  isEmpty: boolean;
};

const useQueue = <T,>(initialQueue?: T[]): UseQueueReturn<T> => {
  const [queue, setQueue] = useState<T[]>(initialQueue || []);

  const enqueue = useCallback((item: T) => {
    setQueue(q => [...q, item]);
  }, []);

  const dequeue = useCallback(() => {
    let dequeued: T | undefined;
    setQueue(q => {
      if (q.length === 0) return q;
      dequeued = q[0];
      return q.slice(1);
    });
    return dequeued;
  }, []);

  const peek = useCallback(() => {
    return queue[0];
  }, [queue]);

  const clear = useCallback(() => {
    setQueue([]);
  }, []);

  return { queue, enqueue, dequeue, peek, clear, size: queue.length, isEmpty: queue.length === 0 };
};

export default useQueue;
