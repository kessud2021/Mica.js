/**
 * Watches store for changes and runs side effects
 * @param store - The store object
 * @param callback - Function to call on changes
 * @returns Unsubscribe function
 */
export default function watchStore<T extends Record<string, any>>(
  store: any,
  callback: (state: T, prevState?: T) => void
): () => void {
  let prevState = store.getState?.();
  callback(prevState);

  return store.subscribe?.((newState: T) => {
    if (JSON.stringify(newState) !== JSON.stringify(prevState)) {
      const prev = prevState;
      prevState = newState;
      callback(newState, prev);
    }
  });
}
