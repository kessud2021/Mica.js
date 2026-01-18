/**
 * Gets a value from a store
 * @param store - The store object
 * @param key - The state key to retrieve
 * @returns The state value
 */
export default function getStoreValue<T extends Record<string, any>, K extends keyof T>(
  store: any,
  key: K
): T[K] {
  const state = store.getState();
  return state[key];
}
