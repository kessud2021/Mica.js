/**
 * Memoizes a function's results
 * @param fn - Function to memoize
 * @param options - Memoization options
 * @returns Memoized function
 */
export default function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options?: { maxSize?: number }
) {
  const cache = new Map<string, any>();
  const maxSize = options?.maxSize || 100;

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);

    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(key, result);
    return result;
  }) as T;
}
