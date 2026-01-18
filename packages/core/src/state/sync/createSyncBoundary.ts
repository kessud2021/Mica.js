/**
 * Creates a sync boundary for state synchronization
 * @param initialState - Initial state
 * @returns Sync boundary object
 */
export default function createSyncBoundary<T extends Record<string, any>>(
  initialState: T
) {
  let state = { ...initialState };
  const syncTargets = new Set<any>();
  const subscribers = new Set<(state: T) => void>();

  return {
    getState(): T {
      return { ...state };
    },

    setState(newState: Partial<T>): void {
      state = { ...state, ...newState };
      subscribers.forEach((cb) => cb({ ...state }));
      syncTargets.forEach((target) => target.set?.(state));
    },

    subscribe(callback: (state: T) => void): () => void {
      subscribers.add(callback);
      callback({ ...state });
      return () => subscribers.delete(callback);
    },

    addSyncTarget(target: any): void {
      syncTargets.add(target);
      target.set?.(state);
    },

    removeSyncTarget(target: any): void {
      syncTargets.delete(target);
    },

    sync(): void {
      syncTargets.forEach((target) => target.set?.(state));
    },
  };
}
