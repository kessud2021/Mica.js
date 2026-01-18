/**
 * Hook-like query function
 * @param key - Query key
 * @param fetcher - Fetch function
 * @returns Query object
 */
export default function useQuery<T>(key: string, fetcher: () => Promise<T>) {
  let data: T | null = null;
  let loading = true;
  let error: Error | null = null;
  const subscribers = new Set<(state: any) => void>();

  const load = async () => {
    loading = true;
    error = null;
    notify();

    try {
      data = await fetcher();
      loading = false;
    } catch (err) {
      error = err as Error;
      loading = false;
    }

    notify();
  };

  const notify = () => {
    subscribers.forEach((cb) => cb({ data, loading, error }));
  };

  load();

  return {
    data,
    loading,
    error,

    refetch: load,

    subscribe(callback: (state: any) => void) {
      subscribers.add(callback);
      callback({ data, loading, error });
      return () => subscribers.delete(callback);
    },
  };
}
