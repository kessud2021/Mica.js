/**
 * Creates a store that handles async operations
 * @param initialState - Initial state
 * @param asyncFn - Async function to load state
 * @returns Store with loading and error states
 */
export default function createAsyncStore<T extends Record<string, any>>(
  initialState: T,
  asyncFn?: () => Promise<T>
) {
  let state = { ...initialState };
  let loading = false;
  let error: Error | null = null;
  const subscribers = new Set<(state: any) => void>();

  const notify = () => {
    subscribers.forEach((cb) => cb({ state, loading, error }));
  };

  const load = async () => {
    if (!asyncFn) return;
    loading = true;
    error = null;
    notify();

    try {
      const result = await asyncFn();
      state = { ...result };
      loading = false;
      error = null;
    } catch (err) {
      error = err as Error;
      loading = false;
    }

    notify();
  };

  if (asyncFn) {
    load();
  }

  return {
    getState(): T {
      return { ...state };
    },

    setState(newState: Partial<T>): void {
      state = { ...state, ...newState };
      subscribers.forEach((cb) => cb({ state, loading, error }));
    },

    subscribe(callback: (data: any) => void): () => void {
      subscribers.add(callback);
      callback({ state, loading, error });
      return () => subscribers.delete(callback);
    },

    reload(): Promise<void> {
      return load();
    },

    isLoading(): boolean {
      return loading;
    },

    getError(): Error | null {
      return error;
    },
  };
}
