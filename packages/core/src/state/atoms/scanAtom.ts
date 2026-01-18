/**
 * Scans an atom with a scan function (like reduce but emits intermediate values)
 * @param atom - Source atom
 * @param scan - Scan function
 * @param initialValue - Initial value
 * @returns Scanned atom
 */
export default function scanAtom<T, U>(
  atom: any,
  scan: (acc: U, value: T) => U,
  initialValue: U
) {
  let accumulator = initialValue;
  const subscribers = new Set<(value: U) => void>();

  atom.subscribe?.((value: T) => {
    accumulator = scan(accumulator, value);
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
  };
}
