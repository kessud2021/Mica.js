/**
 * Creates a selector for a specific store key
 * @param store - The store object
 * @param selector - Function to select from store state
 * @returns Selector object
 */
export default function selectStore<T extends Record<string, any>, U>(
  store: any,
  selector: (state: T) => U
) {
  let cachedValue = selector(store.getState?.());
  const subscribers = new Set<(value: U) => void>();

  store.subscribe?.((state: T) => {
    const newValue = selector(state);
    if (newValue !== cachedValue) {
      cachedValue = newValue;
      subscribers.forEach((cb) => cb(newValue));
    }
  });

  return {
    get(): U {
      return cachedValue;
    },

    subscribe(callback: (value: U) => void): () => void {
      subscribers.add(callback);
      callback(cachedValue);
      return () => subscribers.delete(callback);
    },
  };
}
