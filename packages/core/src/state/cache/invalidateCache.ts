/**
 * Invalidates cache entries
 * @param cache - Cache object
 * @param keys - Keys to invalidate
 */
export default function invalidateCache<K extends string | number>(
  cache: any,
  keys?: K[]
): void {
  if (!keys) {
    cache.clear?.();
  } else {
    keys.forEach((key) => cache.delete?.(key));
  }
}
