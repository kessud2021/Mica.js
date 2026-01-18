/**
 * Creates a snapshot of the store state
 * @param store - The store object
 * @returns Snapshot object
 */
export default function snapshotStore<T extends Record<string, any>>(
  store: any
) {
  const snapshot = store.getState?.();
  const timestamp = Date.now();

  return {
    get(): T {
      return { ...snapshot };
    },

    restore(): void {
      store.setState?.(snapshot);
    },

    getTimestamp(): number {
      return timestamp;
    },

    compare(): Record<string, { snapshot: any; current: any }> {
      const currentState = store.getState?.();
      const diff: Record<string, { snapshot: any; current: any }> = {};

      for (const key in snapshot) {
        if (snapshot[key] !== currentState[key]) {
          diff[key] = { snapshot: snapshot[key], current: currentState[key] };
        }
      }

      return diff;
    },
  };
}
