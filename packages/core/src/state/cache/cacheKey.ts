/**
 * Creates a cache key from arguments
 * @param args - Arguments to serialize
 * @returns Cache key
 */
export default function cacheKey(...args: any[]): string {
  return JSON.stringify(args);
}
