/**
 * Creates a live query - a reactive query that updates when dependencies change
 * @param queryFn - Function that performs the query
 * @param dependencies - Dependencies that trigger query refresh
 * @returns Live query with execute and subscribe methods
 */
export default function liveQuery<T>(
  queryFn: () => Promise<T> | T,
  dependencies: any[] = []
) {
  let result: T | null = null;
  let loading = false;
  let error: Error | null = null;
  const subscribers = new Set<(state: any) => void>();

  const execute = async () => {
    loading = true;
    error = null;
    notify();

    try {
      result = await queryFn();
      loading = false;
      notify();
    } catch (err) {
      error = err as Error;
      loading = false;
      notify();
    }
  };

  const notify = () => {
    subscribers.forEach((cb) =>
      cb({ result, loading, error })
    );
  };

  execute();

  dependencies.forEach((dep: any) => {
    dep.subscribe?.(() => execute());
  });

  return {
    get() {
      return { result, loading, error };
    },

    subscribe(callback: (state: any) => void) {
      subscribers.add(callback);
      callback({ result, loading, error });
      return () => subscribers.delete(callback);
    },

    refetch: () => execute(),
  };
}
