/**
 * Creates a store slice with isolated state
 * @param storeName - Name of the slice
 * @param initialState - Initial state for the slice
 * @returns Slice object with methods
 */
export default function createStoreSlice<T extends Record<string, any>>(
  storeName: string,
  initialState: T
) {
  let state = { ...initialState };
  const subscribers = new Set<(newState: T) => void>();

  return {
    name: storeName,

    getState(): T {
      return { ...state };
    },

    setState(newState: Partial<T>): void {
      state = { ...state, ...newState };
      subscribers.forEach((cb) => cb({ ...state }));
    },

    subscribe(callback: (state: T) => void): () => void {
      subscribers.add(callback);
      callback({ ...state });
      return () => subscribers.delete(callback);
    },

    reset(): void {
      state = { ...initialState };
      subscribers.forEach((cb) => cb({ ...state }));
    },

    getInitialState(): T {
      return { ...initialState };
    },
  };
}
