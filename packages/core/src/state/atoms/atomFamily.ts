/**
 * Creates a family of atoms indexed by a key
 * @param createAtomWithKey - Function that creates an atom given a key
 * @returns Object with get method to retrieve atoms by key
 */
export default function atomFamily<K, T>(
  createAtomWithKey: (key: K) => T
) {
  const cache = new Map<K, T>();

  return {
    get(key: K): T {
      if (!cache.has(key)) {
        cache.set(key, createAtomWithKey(key));
      }
      return cache.get(key)!;
    },

    clear(): void {
      cache.clear();
    },

    delete(key: K): void {
      cache.delete(key);
    },

    has(key: K): boolean {
      return cache.has(key);
    },
  };
}
