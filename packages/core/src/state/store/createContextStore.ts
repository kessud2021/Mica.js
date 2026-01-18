/**
 * Creates a context store for component integration
 * @param initialState - Initial state
 * @returns Context store object
 */
export default function createContextStore<T extends Record<string, any>>(
  initialState: T
) {
  let state = { ...initialState };
  const subscribers = new Map<any, (state: T) => void>();

  return {
    getState(): T {
      return { ...state };
    },

    setState(newState: Partial<T>): void {
      state = { ...state, ...newState };
      subscribers.forEach((cb) => cb({ ...state }));
    },

    subscribe(context: any, callback: (state: T) => void): void {
      subscribers.set(context, callback);
      callback({ ...state });
    },

    unsubscribe(context: any): void {
      subscribers.delete(context);
    },

    notifyAll(): void {
      subscribers.forEach((cb) => cb({ ...state }));
    },
  };
}
