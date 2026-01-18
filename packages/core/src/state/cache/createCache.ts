/**
 * Creates a cache store
 * @param options - Cache configuration
 * @returns Cache object with methods
 */
export default function createCache<K extends string | number, V>(
  options?: { maxSize?: number; ttl?: number }
) {
  const cache = new Map<K, { value: V; expires?: number }>();
  const maxSize = options?.maxSize || 100;
  const ttl = options?.ttl;

  const isExpired = (entry: { value: V; expires?: number }) => {
    if (!entry.expires) return false;
    return Date.now() > entry.expires;
  };

  return {
    get(key: K): V | undefined {
      const entry = cache.get(key);
      if (!entry) return undefined;
      if (isExpired(entry)) {
        cache.delete(key);
        return undefined;
      }
      return entry.value;
    },

    set(key: K, value: V): void {
      if (cache.size >= maxSize && !cache.has(key)) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }

      cache.set(key, {
        value,
        expires: ttl ? Date.now() + ttl : undefined,
      });
    },

    has(key: K): boolean {
      return this.get(key) !== undefined;
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
      const result: Array<[K, V]> = [];
      for (const [key, entry] of cache) {
        if (!isExpired(entry)) {
          result.push([key, entry.value]);
        }
      }
      return result;
    },
  };
}
