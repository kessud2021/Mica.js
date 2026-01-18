/**
 * Creates a distinct atom - only notifies on distinct value changes
 * @param atom - The source atom
 * @param compareFn - Optional custom equality function
 * @returns Distinct atom
 */
export default function distinctAtom<T>(
  atom: any,
  compareFn?: (a: T, b: T) => boolean
) {
  let lastValue = atom.get?.() || atom.getValue?.();
  const subscribers = new Set<(value: T) => void>();
  const isEqual = compareFn || ((a: T, b: T) => a === b);

  atom.subscribe?.((value: T) => {
    if (!isEqual(value, lastValue)) {
      lastValue = value;
      subscribers.forEach((cb) => cb(value));
    }
  });

  return {
    get(): T {
      return lastValue;
    },

    subscribe(callback: (value: T) => void) {
      subscribers.add(callback);
      callback(lastValue);
      return () => subscribers.delete(callback);
    },
  };
}
