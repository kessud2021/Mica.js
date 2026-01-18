/**
 * Provides a default value for an atom if null/undefined
 * @param atom - The atom
 * @param defaultValue - Default value
 * @returns Atom with default
 */
export default function withDefault<T>(atom: any, defaultValue: T) {
  let currentValue = atom.get?.() || atom.getValue?.() || defaultValue;
  const subscribers = new Set<(value: T) => void>();

  atom.subscribe?.((value: T) => {
    currentValue = value || defaultValue;
    subscribers.forEach((cb) => cb(currentValue));
  });

  return {
    get(): T {
      return currentValue;
    },

    subscribe(callback: (value: T) => void) {
      subscribers.add(callback);
      callback(currentValue);
      return () => subscribers.delete(callback);
    },
  };
}
