/**
 * Creates a store with default values fallback
 * @param store - Base store
 * @param defaults - Default values
 * @returns Store with defaults
 */
export default function createStoreWithDefaults<T extends Record<string, any>>(
  store: any,
  defaults: Partial<T>
) {
  return {
    getState(): T {
      const state = store.getState?.();
      return { ...defaults, ...state };
    },

    setState(newState: Partial<T>): void {
      store.setState?.(newState);
    },

    subscribe(callback: (state: T) => void) {
      return store.subscribe?.((state: T) => {
        callback({ ...defaults, ...state });
      });
    },

    reset(): void {
      store.reset?.();
    },
  };
}
