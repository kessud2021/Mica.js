/**
 * Creates a stale-while-revalidate cache
 * @param fetcher - Function to fetch data
 * @param options - SWR options
 * @returns SWR cache object
 */
export default function createSWRCache<K extends string | number, V>(
  fetcher: (key: K) => Promise<V>,
  options?: { revalidateInterval?: number; dedupingInterval?: number }
) {
  const cache = new Map<K, { data: V; loading: boolean; revalidating: boolean }>();
  const revalidateInterval = options?.revalidateInterval || 60000;
  const dedupingInterval = options?.dedupingInterval || 2000;
  const inflightRequests = new Map<K, Promise<V>>();

  return {
    async get(key: K): Promise<V> {
      // Check if already in flight to avoid duplicate requests
      if (inflightRequests.has(key)) {
        return inflightRequests.get(key)!;
      }

      const cached = cache.get(key);
      if (cached) {
        // Return cached data immediately
        const promise = fetcher(key)
          .then((data) => {
            cache.set(key, { data, loading: false, revalidating: false });
            inflightRequests.delete(key);
            return data;
          })
          .catch(() => {
            cache.set(key, { ...cached, revalidating: false });
            inflightRequests.delete(key);
            return cached.data;
          });

        if (!cached.revalidating) {
          cache.set(key, { ...cached, revalidating: true });
        }

        return cached.data;
      }

      // No cache, fetch immediately
      const promise = fetcher(key);
      inflightRequests.set(key, promise);

      return promise
        .then((data) => {
          cache.set(key, { data, loading: false, revalidating: false });
          inflightRequests.delete(key);
          return data;
        })
        .catch(() => {
          inflightRequests.delete(key);
          throw new Error('Failed to fetch');
        });
    },

    clear(): void {
      cache.clear();
      inflightRequests.clear();
    },
  };
}
