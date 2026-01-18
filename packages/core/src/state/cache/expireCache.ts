/**
 * Expires cache entries after a duration
 * @param cache - Cache object
 * @param key - Key to expire
 * @param ms - Duration in milliseconds
 */
export default function expireCache<K extends string | number>(
  cache: any,
  key: K,
  ms: number
): void {
  setTimeout(() => {
    cache.delete?.(key);
  }, ms);
}
