/**
 * Creates an in-memory cache
 * @param options - Cache options
 * @returns Memory cache object
 */
export default function createMemoryCache<K extends string | number, V>(
  options?: { maxSize?: number }
) {
  const cache = new Map<K, V>();
  const maxSize = options?.maxSize || Infinity;

  return {
    get(key: K): V | undefined {
      return cache.get(key);
    },

    set(key: K, value: V): void {
      if (cache.size >= maxSize && !cache.has(key)) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      cache.set(key, value);
    },

    has(key: K): boolean {
      return cache.has(key);
    },

    delete(key: K): void {
      cache.delete(key);
    },

    clear(): void {
      cache.clear();
    },

    size(): number {
      return cache.size;
    },

    entries(): Array<[K, V]> {
      return Array.from(cache.entries());
    },
  };
}
