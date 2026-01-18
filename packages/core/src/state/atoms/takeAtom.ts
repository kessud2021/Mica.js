/**
 * Takes only a number of emissions from an atom
 * @param atom - The atom
 * @param count - Maximum emissions to take
 * @returns Atom that takes limited emissions
 */
export default function takeAtom<T>(atom: any, count: number) {
  let emitted = 0;
  let currentValue = atom.get?.() || atom.getValue?.();
  const subscribers = new Set<(value: T) => void>();

  atom.subscribe?.((value: T) => {
    if (emitted < count) {
      emitted++;
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
      if (emitted > 0) {
        callback(currentValue);
      }
      return () => subscribers.delete(callback);
    },
  };
}
