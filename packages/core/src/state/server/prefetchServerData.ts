/**
 * Prefetches data from server
 * @param url - Server endpoint
 * @param cache - Cache object to store prefetched data
 * @returns Promise that resolves when prefetch is done
 */
export default async function prefetchServerData<T>(
  url: string,
  cache?: any
): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  if (cache) {
    cache.set?.(url, data);
  }

  return data;
}
