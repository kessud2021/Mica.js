/**
 * Skips a number of emissions from an atom
 * @param atom - The atom
 * @param count - Number of emissions to skip
 * @returns Atom that skips emissions
 */
export default function skipAtom<T>(atom: any, count: number) {
  let emitted = 0;
  let currentValue = atom.get?.() || atom.getValue?.();
  const subscribers = new Set<(value: T) => void>();

  atom.subscribe?.((value: T) => {
    emitted++;
    if (emitted > count) {
      currentValue = value;
      subscribers.forEach((cb) => cb(value));
    }
  });

  return {
    get(): T {
      return currentValue;
    },

    subscribe(callback: (value: T) => void) {
      subscribers.add(callback);
      if (emitted > count) {
        callback(currentValue);
      }
      return () => subscribers.delete(callback);
    },
  };
}
