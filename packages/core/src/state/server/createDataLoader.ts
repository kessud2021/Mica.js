/**
 * Creates a data loader with batching
 * @param batchFn - Function to batch load data
 * @returns Data loader object
 */
export default function createDataLoader<K, V>(
  batchFn: (keys: K[]) => Promise<V[]>
) {
  const cache = new Map<K, V>();
  let queue: K[] = [];
  let timeout: NodeJS.Timeout | null = null;

  const flush = async () => {
    if (queue.length === 0) return;

    const keysToLoad = [...queue];
    queue = [];

    try {
      const results = await batchFn(keysToLoad);
      keysToLoad.forEach((key, index) => {
        cache.set(key, results[index]);
      });
    } catch (error) {
      console.error('DataLoader batch failed:', error);
    }
  };

  const scheduleFlush = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(flush, 0);
  };

  return {
    async load(key: K): Promise<V> {
      if (cache.has(key)) {
        return cache.get(key)!;
      }

      queue.push(key);
      scheduleFlush();

      // Return cached value or wait for flush
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (cache.has(key)) {
            clearInterval(checkInterval);
            resolve(cache.get(key)!);
          }
        }, 1);
      });
    },

    async loadMany(keys: K[]): Promise<V[]> {
      return Promise.all(keys.map((k) => this.load(k)));
    },

    clear(): void {
      cache.clear();
      queue = [];
      if (timeout) clearTimeout(timeout);
    },

    prime(key: K, value: V): void {
      cache.set(key, value);
    },
  };
}
