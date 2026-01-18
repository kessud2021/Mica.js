/**
 * Creates a query object with caching and status tracking
 * @param key - Query key
 * @param fetcher - Fetch function
 * @returns Query object
 */
export default function createQuery<T>(key: string, fetcher: () => Promise<T>) {
  let data: T | null = null;
  let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  let error: Error | null = null;
  const subscribers = new Set<(state: any) => void>();

  const notify = () => {
    subscribers.forEach((cb) => cb({ data, status, error }));
  };

  const refetch = async () => {
    status = 'loading';
    error = null;
    notify();

    try {
      data = await fetcher();
      status = 'success';
    } catch (err) {
      error = err as Error;
      status = 'error';
    }

    notify();
  };

  return {
    getKey(): string {
      return key;
    },

    refetch,

    get() {
      return { data, status, error };
    },

    isLoading(): boolean {
      return status === 'loading';
    },

    isError(): boolean {
      return status === 'error';
    },

    isSuccess(): boolean {
      return status === 'success';
    },

    subscribe(callback: (state: any) => void) {
      subscribers.add(callback);
      callback({ data, status, error });
      return () => subscribers.delete(callback);
    },
  };
}
