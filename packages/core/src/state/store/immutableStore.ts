/**
 * Creates an immutable store wrapper
 * @param store - The store object
 * @returns Immutable store
 */
export default function immutableStore<T extends Record<string, any>>(
  store: any
) {
  return {
    getState(): Readonly<T> {
      return Object.freeze({ ...store.getState?.() });
    },

    setState(newState: Partial<T>): void {
      store.setState?.(newState);
    },

    subscribe(callback: (state: T) => void): () => void {
      return store.subscribe?.((state: T) => {
        callback(Object.freeze({ ...state }));
      });
    },

    reset(): void {
      store.reset?.();
    },
  };
}
