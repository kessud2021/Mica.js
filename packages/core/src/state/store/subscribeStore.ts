/**
 * Subscribes to store changes
 * @param store - The store object
 * @param callback - Function to call on store updates
 * @returns Unsubscribe function
 */
export default function subscribeStore<T extends Record<string, any>>(
  store: any,
  callback: (state: T) => void
): () => void {
  return store.subscribe?.(callback) || (() => {});
}
