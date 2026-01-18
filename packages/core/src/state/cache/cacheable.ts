/**
 * Wraps a function with caching
 * @param fn - Function to cache
 * @param cache - Cache object
 * @param keyFn - Function to generate cache key
 * @returns Cached function
 */
export default function cacheable<T extends (...args: any[]) => any>(
  fn: T,
  cache: any,
  keyFn?: (...args: Parameters<T>) => string
) {
  return ((...args: Parameters<T>) => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    const cached = cache.get?.(key);

    if (cached !== undefined) {
      return cached;
    }

    const result = fn(...args);
    cache.set?.(key, result);

    if (result instanceof Promise) {
      return result.then((resolved) => {
        cache.set?.(key, resolved);
        return resolved;
      });
    }

    return result;
  }) as T;
}
