/**
 * Persists a store to external storage
 * @param store - The store object
 * @param key - Storage key
 * @param storage - Storage object (localStorage, etc)
 */
export default function persistStore<T extends Record<string, any>>(
  store: any,
  key: string,
  storage?: Storage
): void {
  const st = storage || (typeof window !== 'undefined' ? localStorage : null);
  if (!st) return;

  const state = store.getState?.();
  if (state) {
    st.setItem(key, JSON.stringify(state));
  }

  store.subscribe?.((newState: T) => {
    st.setItem(key, JSON.stringify(newState));
  });
}
