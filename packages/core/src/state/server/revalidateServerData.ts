/**
 * Revalidates server data by key
 * @param queryKey - Query key to revalidate
 * @param fetcher - Fetch function
 * @returns Promise that resolves when done
 */
export default async function revalidateServerData<T>(
  queryKey: string,
  fetcher: () => Promise<T>
): Promise<T> {
  try {
    return await fetcher();
  } catch (error) {
    console.error(`Failed to revalidate ${queryKey}:`, error);
    throw error;
  }
}
