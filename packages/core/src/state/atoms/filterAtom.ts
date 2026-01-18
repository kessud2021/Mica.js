/**
 * Filters atom updates - only notifies on values that pass a predicate
 * @param atom - The source atom
 * @param predicate - Function to test values
 * @returns Filtered atom
 */
export default function filterAtom<T>(
  atom: any,
  predicate: (value: T) => boolean
) {
  let currentValue = atom.get?.() || atom.getValue?.();
  const subscribers = new Set<(value: T) => void>();

  atom.subscribe?.((value: T) => {
    if (predicate(value)) {
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
      callback(currentValue);
      return () => subscribers.delete(callback);
    },
  };
}
