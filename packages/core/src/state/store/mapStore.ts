/**
 * Maps store state through a transformation
 * @param store - The store
 * @param mapper - Mapping function
 * @returns Mapped store
 */
export default function mapStore<T extends Record<string, any>, U>(
  store: any,
  mapper: (state: T) => U
) {
  let mappedValue = mapper(store.getState?.());
  const subscribers = new Set<(value: U) => void>();

  store.subscribe?.((state: T) => {
    const newMapped = mapper(state);
    if (newMapped !== mappedValue) {
      mappedValue = newMapped;
      subscribers.forEach((cb) => cb(newMapped));
    }
  });

  return {
    get(): U {
      return mappedValue;
    },

    subscribe(callback: (value: U) => void) {
      subscribers.add(callback);
      callback(mappedValue);
      return () => subscribers.delete(callback);
    },
  };
}
