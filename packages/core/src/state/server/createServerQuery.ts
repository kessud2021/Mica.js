/**
 * Creates a server query with caching
 * @param key - Query key
 * @param fetcher - Function to fetch data
 * @returns Server query object
 */
export default function createServerQuery<T>(
  key: string,
  fetcher: () => Promise<T>
) {
  let data: T | null = null;
  let loading = false;
  let error: Error | null = null;
  const subscribers = new Set<(state: any) => void>();

  const fetch = async () => {
    loading = true;
    error = null;
    notify();

    try {
      data = await fetcher();
      error = null;
    } catch (err) {
      error = err as Error;
    }

    loading = false;
    notify();
  };

  const notify = () => {
    subscribers.forEach((cb) => cb({ data, loading, error }));
  };

  fetch();

  return {
    getKey(): string {
      return key;
    },

    get() {
      return { data, loading, error };
    },

    refetch: () => fetch(),

    subscribe(callback: (state: any) => void) {
      subscribers.add(callback);
      callback({ data, loading, error });
      return () => subscribers.delete(callback);
    },
  };
}
