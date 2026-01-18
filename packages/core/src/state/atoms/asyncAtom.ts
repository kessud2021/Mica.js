/**
 * Creates an async atom that loads data asynchronously
 * @param asyncFn - Function that returns a promise
 * @param initialValue - Initial value while loading
 * @returns Async atom with status tracking
 */
export default function asyncAtom<T>(
  asyncFn: () => Promise<T>,
  initialValue?: T
) {
  let value = initialValue || null;
  let loading = true;
  let error: Error | null = null;
  const subscribers = new Set<(state: any) => void>();

  const notify = () => {
    subscribers.forEach((cb) => cb({ value, loading, error }));
  };

  const load = async () => {
    loading = true;
    error = null;
    notify();

    try {
      value = await asyncFn();
      loading = false;
      error = null;
    } catch (err) {
      error = err as Error;
      loading = false;
    }

    notify();
  };

  load();

  return {
    get() {
      return { value, loading, error };
    },

    subscribe(callback: (state: any) => void) {
      subscribers.add(callback);
      callback({ value, loading, error });
      return () => subscribers.delete(callback);
    },

    reload(): Promise<void> {
      return load();
    },
  };
}
