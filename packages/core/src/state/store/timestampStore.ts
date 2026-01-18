/**
 * Adds timestamps to store updates
 * @param store - The store object
 * @returns Store with timestamps
 */
export default function timestampStore<T extends Record<string, any>>(store: any) {
  const timestamps: Record<string, number> = {};

  return {
    getState(): T & { __timestamps?: Record<string, number> } {
      return { ...store.getState?.(), __timestamps: timestamps };
    },

    setState(newState: Partial<T>): void {
      for (const key in newState) {
        timestamps[key] = Date.now();
      }
      store.setState?.(newState);
    },

    subscribe(callback: (state: any) => void): () => void {
      return store.subscribe?.((state: T) => {
        callback({ ...state, __timestamps: timestamps });
      });
    },

    getTimestamp(key: string): number | undefined {
      return timestamps[key];
    },
  };
}
