/**
 * Hydrates a store from external storage
 * @param store - The store object
 * @param key - Storage key
 * @param storage - Storage object
 * @returns Hydrated state or initial state
 */
export default function hydrateStore<T extends Record<string, any>>(
  store: any,
  key: string,
  storage?: Storage
): T {
  const st = storage || (typeof window !== 'undefined' ? localStorage : null);
  
  if (st) {
    const stored = st.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        store.setState?.(parsed);
        return parsed;
      } catch {
        // Continue with initial state
      }
    }
  }

  return store.getState?.();
}
