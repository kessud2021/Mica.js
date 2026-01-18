/**
 * Creates an LRU (Least Recently Used) cache
 * @param maxSize - Maximum cache size
 * @returns LRU cache object
 */
export default function lruCache<K extends string | number, V>(maxSize: number = 100) {
  const cache = new Map<K, V>();
  const accessOrder: K[] = [];

  return {
    get(key: K): V | undefined {
      if (cache.has(key)) {
        // Move to end (most recent)
        const index = accessOrder.indexOf(key);
        if (index > -1) {
          accessOrder.splice(index, 1);
        }
        accessOrder.push(key);
        return cache.get(key);
      }
      return undefined;
    },

    set(key: K, value: V): void {
      if (cache.has(key)) {
        cache.set(key, value);
        const index = accessOrder.indexOf(key);
        if (index > -1) {
          accessOrder.splice(index, 1);
        }
        accessOrder.push(key);
      } else {
        if (cache.size >= maxSize && accessOrder.length > 0) {
          const lru = accessOrder.shift();
          if (lru !== undefined) {
            cache.delete(lru);
          }
        }
        cache.set(key, value);
        accessOrder.push(key);
      }
    },

    clear(): void {
      cache.clear();
      accessOrder.length = 0;
    },

    size(): number {
      return cache.size;
    },
  };
}
