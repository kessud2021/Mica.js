/**
 * Creates a store using a reducer pattern
 * @param reducer - Reducer function
 * @param initialState - Initial state
 * @returns Store object with dispatch
 */
export default function createReducerStore<T extends Record<string, any>, A = any>(
  reducer: (state: T, action: A) => T,
  initialState: T
) {
  let state = { ...initialState };
  const subscribers = new Set<(state: T) => void>();

  return {
    getState(): T {
      return { ...state };
    },

    dispatch(action: A): void {
      state = reducer(state, action);
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
  };
}
