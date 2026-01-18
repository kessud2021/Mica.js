/**
 * Creates a proxy for a store with getter/setter traps
 * @param store - Base store
 * @returns Proxy store
 */
export default function createStoreProxy<T extends Record<string, any>>(store: any) {
  return new Proxy(store.getState?.() || {}, {
    get(target, prop) {
      if (prop === 'getState' || prop === 'setState' || prop === 'subscribe') {
        return store[prop as string].bind(store);
      }
      return target[prop as keyof T];
    },

    set(target, prop, value) {
      const key = prop as keyof T;
      store.setState?.({ [key]: value });
      target[key] = value;
      return true;
    },
  }) as T;
}
