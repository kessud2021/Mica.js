/**
 * Provides a starting value for an atom
 * @param atom - The atom
 * @param value - Starting value
 * @returns Atom with starting value
 */
export default function startWithAtom<T>(atom: any, value: T) {
  let current = value;
  const subscribers = new Set<(value: T) => void>();

  atom.subscribe?.((newValue: T) => {
    current = newValue;
    subscribers.forEach((cb) => cb(newValue));
  });

  return {
    get(): T {
      return current;
    },

    subscribe(callback: (value: T) => void) {
      subscribers.add(callback);
      callback(current);
      return () => subscribers.delete(callback);
    },
  };
}
