/**
 * Sets a value in cache
 * @param cache - Cache object
 * @param key - Cache key
 * @param value - Value to cache
 */
export default function setCacheValue<K extends string | number, V>(
  cache: any,
  key: K,
  value: V
): void {
  cache.set?.(key, value);
}
