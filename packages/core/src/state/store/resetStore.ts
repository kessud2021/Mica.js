/**
 * Resets a store to its initial state
 * @param store - The store object
 */
export default function resetStore(store: any): void {
  store.reset?.();
}
