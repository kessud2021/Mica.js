/**
 * Revalidates cache by refreshing entries
 * @param cache - Cache object
 * @param fetcher - Function to fetch fresh data
 * @param keys - Keys to revalidate
 * @returns Promise that resolves when done
 */
export default async function revalidateCache<K extends string | number, V>(
  cache: any,
  fetcher: (key: K) => Promise<V>,
  keys: K[]
): Promise<void> {
  await Promise.all(
    keys.map(async (key) => {
      const value = await fetcher(key);
      cache.set?.(key, value);
    })
  );
}
