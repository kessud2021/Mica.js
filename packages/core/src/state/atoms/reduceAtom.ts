/**
 * Reduces an atom using a reducer function
 * @param atom - The source atom
 * @param reducer - Reducer function
 * @param initialValue - Initial accumulator value
 * @returns Reduced atom
 */
export default function reduceAtom<T, U>(
  atom: any,
  reducer: (acc: U, value: T) => U,
  initialValue: U
) {
  let accumulator = initialValue;
  const subscribers = new Set<(value: U) => void>();

  atom.subscribe?.((value: T) => {
    accumulator = reducer(accumulator, value);
    subscribers.forEach((cb) => cb(accumulator));
  });

  return {
    get(): U {
      return accumulator;
    },

    subscribe(callback: (value: U) => void) {
      subscribers.add(callback);
      callback(accumulator);
      return () => subscribers.delete(callback);
    },

    reset(): void {
      accumulator = initialValue;
      subscribers.forEach((cb) => cb(accumulator));
    },
  };
}
