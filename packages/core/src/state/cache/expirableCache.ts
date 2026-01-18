/**
 * Creates a cache where items expire
 * @param ttl - Time to live in milliseconds
 * @returns Expirable cache
 */
export default function expirableCache<K extends string | number, V>(ttl: number) {
  const cache = new Map<K, { value: V; expiresAt: number }>();

  const isExpired = (expiresAt: number) => Date.now() > expiresAt;

  return {
    get(key: K): V | undefined {
      const entry = cache.get(key);
      if (!entry) return undefined;
      if (isExpired(entry.expiresAt)) {
        cache.delete(key);
        return undefined;
      }
      return entry.value;
    },

    set(key: K, value: V): void {
      cache.set(key, {
        value,
        expiresAt: Date.now() + ttl,
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

    cleanupExpired(): number {
      let count = 0;
      for (const [key, entry] of cache) {
        if (isExpired(entry.expiresAt)) {
          cache.delete(key);
          count++;
        }
      }
      return count;
    },
  };
}
