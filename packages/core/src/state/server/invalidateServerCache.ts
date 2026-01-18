/**
 * Invalidates server cache entries
 * @param queryKeys - Query keys to invalidate
 * @returns Function to invalidate cache
 */
export default function invalidateServerCache(queryKeys: string[]) {
  const invalidatedKeys = new Set<string>();

  return {
    invalidate(): void {
      queryKeys.forEach((key) => invalidatedKeys.add(key));
    },

    isInvalidated(key: string): boolean {
      return invalidatedKeys.has(key);
    },

    reset(): void {
      invalidatedKeys.clear();
    },

    getInvalidatedKeys(): string[] {
      return Array.from(invalidatedKeys);
    },
  };
}
