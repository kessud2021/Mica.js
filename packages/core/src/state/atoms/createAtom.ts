/**
 * Creates an atom - a piece of state that can be read, written, and subscribed to
 * @param initialValue - The initial value of the atom
 * @returns An object with get, set, subscribe, and unsubscribe methods
 */
export default function createAtom<T>(initialValue: T) {
  let value = initialValue;
  const subscribers = new Set<(newValue: T) => void>();

  return {
    get(): T {
      return value;
    },

    set(newValue: T | ((prev: T) => T)): void {
      const nextValue =
        typeof newValue === 'function' ? (newValue as (prev: T) => T)(value) : newValue;

      if (nextValue !== value) {
        value = nextValue;
        subscribers.forEach((cb) => cb(value));
      }
    },

    subscribe(callback: (value: T) => void): () => void {
      subscribers.add(callback);
      callback(value);
      return () => {
        subscribers.delete(callback);
      };
    },

    reset(): void {
      this.set(initialValue);
    },

    getValue(): T {
      return value;
    },
  };
}
