/**
 * Taps into atom updates for side effects
 * @param atom - The atom
 * @param tapFn - Side effect function
 * @returns Atom with tap effect
 */
export default function tapAtom<T>(atom: any, tapFn: (value: T) => void) {
  let currentValue = atom.get?.() || atom.getValue?.();
  const subscribers = new Set<(value: T) => void>();

  atom.subscribe?.((value: T) => {
    tapFn(value);
    currentValue = value;
    subscribers.forEach((cb) => cb(value));
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
