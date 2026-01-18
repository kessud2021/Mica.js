/**
 * Combines multiple store slices into one store
 * @param slices - Map of slices to combine
 * @returns Combined store object
 */
export default function combineStores<T extends Record<string, any>>(
  slices: { [K in keyof T]: T[K] }
) {
  const subscribers = new Set<(state: any) => void>();

  const getCombinedState = () => {
    const result = {} as T;
    for (const key in slices) {
      const slice = slices[key];
      result[key] = slice.getState?.() || slice;
    }
    return result;
  };

  let cachedState = getCombinedState();

  Object.values(slices).forEach((slice: any) => {
    if (slice.subscribe) {
      slice.subscribe(() => {
        const newState = getCombinedState();
        if (JSON.stringify(newState) !== JSON.stringify(cachedState)) {
          cachedState = newState;
          subscribers.forEach((cb) => cb(newState));
        }
      });
    }
  });

  return {
    getState(): T {
      return cachedState;
    },

    subscribe(callback: (state: T) => void): () => void {
      subscribers.add(callback);
      callback(cachedState);
      return () => subscribers.delete(callback);
    },

    getSlice<K extends keyof T>(key: K): any {
      return slices[key];
    },
  };
}
