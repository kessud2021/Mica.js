/**
 * Creates an atom that syncs with external storage
 * @param key - Key for external storage
 * @param initialValue - Initial value
 * @param storage - Storage interface (localStorage, sessionStorage, etc)
 * @returns Synced atom
 */
export default function syncAtom<T>(
  key: string,
  initialValue: T,
  storage?: Storage
) {
  const store = storage || (typeof window !== 'undefined' ? localStorage : null);
  
  let value = initialValue;
  if (store) {
    const stored = store.getItem(key);
    if (stored) {
      try {
        value = JSON.parse(stored);
      } catch {
        value = initialValue;
      }
    }
  }

  const subscribers = new Set<(value: T) => void>();

  return {
    get(): T {
      return value;
    },

    set(newValue: T | ((prev: T) => T)): void {
      const nextValue =
        typeof newValue === 'function' ? (newValue as (prev: T) => T)(value) : newValue;

      if (nextValue !== value) {
        value = nextValue;
        if (store) {
          store.setItem(key, JSON.stringify(value));
        }
        subscribers.forEach((cb) => cb(value));
      }
    },

    subscribe(callback: (value: T) => void) {
      subscribers.add(callback);
      callback(value);
      return () => subscribers.delete(callback);
    },

    clear(): void {
      if (store) {
        store.removeItem(key);
      }
      value = initialValue;
    },
  };
}
