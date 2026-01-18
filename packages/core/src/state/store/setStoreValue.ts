/**
 * Sets a value in a store
 * @param store - The store object
 * @param key - The state key to update
 * @param value - The new value
 */
export default function setStoreValue<T extends Record<string, any>, K extends keyof T>(
  store: any,
  key: K,
  value: T[K] | ((prev: T[K]) => T[K])
): void {
  store.setState(key, value);
}
