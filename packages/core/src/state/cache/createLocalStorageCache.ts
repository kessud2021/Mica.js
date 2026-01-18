/**
 * Creates a localStorage-backed cache
 * @param prefix - Storage key prefix
 * @param options - Cache options
 * @returns LocalStorage cache object
 */
export default function createLocalStorageCache<K extends string | number, V>(
  prefix = 'cache_',
  options?: { ttl?: number }
) {
  const getKey = (key: K) => `${prefix}${key}`;
  const ttl = options?.ttl;

  return {
    get(key: K): V | undefined {
      if (typeof window === 'undefined') return undefined;

      try {
        const stored = localStorage.getItem(getKey(key));
        if (!stored) return undefined;

        const { value, expires } = JSON.parse(stored);
        if (expires && Date.now() > expires) {
          localStorage.removeItem(getKey(key));
          return undefined;
        }

        return value;
      } catch {
        return undefined;
      }
    },

    set(key: K, value: V): void {
      if (typeof window === 'undefined') return;

      try {
        localStorage.setItem(
          getKey(key),
          JSON.stringify({
            value,
            expires: ttl ? Date.now() + ttl : undefined,
          })
        );
      } catch {
        // Storage full or not available
      }
    },

    has(key: K): boolean {
      return this.get(key) !== undefined;
    },

    delete(key: K): void {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(getKey(key));
    },

    clear(): void {
      if (typeof window === 'undefined') return;
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(prefix)) {
          localStorage.removeItem(key);
        }
      });
    },
  };
}
