/**
 * Provides initial value to an atom
 * @param initialValue - The initial value
 * @returns Atom creator function
 */
export default function withInitial<T>(initialValue: T) {
  return () => {
    let value = initialValue;
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
          subscribers.forEach((cb) => cb(value));
        }
      },

      subscribe(callback: (value: T) => void) {
        subscribers.add(callback);
        callback(value);
        return () => subscribers.delete(callback);
      },
    };
  };
}
