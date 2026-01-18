/**
 * Gets a value from cache
 * @param cache - Cache object
 * @param key - Cache key
 * @returns Cached value or undefined
 */
export default function getCacheValue<K extends string | number, V>(
  cache: any,
  key: K
): V | undefined {
  return cache.get?.(key);
}
