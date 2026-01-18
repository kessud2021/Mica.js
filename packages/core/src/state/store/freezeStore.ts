/**
 * Freezes a store preventing mutations
 * @param store - The store
 * @returns Frozen store
 */
export default function freezeStore<T extends Record<string, any>>(store: any) {
  return {
    getState(): Readonly<T> {
      const state = store.getState?.();
      return Object.freeze({ ...state });
    },

    setState(newState: Partial<T>): void {
      throw new Error('Cannot mutate frozen store');
    },

    subscribe(callback: (state: T) => void) {
      return store.subscribe?.((state: T) => {
        callback(Object.freeze({ ...state }) as T);
      });
    },

    reset(): void {
      throw new Error('Cannot reset frozen store');
    },
  };
}
