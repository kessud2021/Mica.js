/**
 * Adds logging to a store
 * @param store - The store
 * @param logger - Logger function
 * @returns Store with logging
 */
export default function logStore<T extends Record<string, any>>(
  store: any,
  logger?: (message: string, data: any) => void
) {
  const log = logger || console.log;

  return {
    getState(): T {
      return store.getState?.();
    },

    setState(newState: Partial<T>): void {
      log('[Store] Setting state:', newState);
      store.setState?.(newState);
    },

    subscribe(callback: (state: T) => void) {
      return store.subscribe?.((state: T) => {
        log('[Store] State updated:', state);
        callback(state);
      });
    },

    reset(): void {
      log('[Store] Resetting to initial state');
      store.reset?.();
    },
  };
}
