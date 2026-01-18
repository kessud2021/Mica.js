/**
 * Maps an atom value through a transformation
 * @param atom - The source atom
 * @param transform - Function to transform values
 * @returns New atom with transformed values
 */
export default function mapAtom<T, U>(
  atom: any,
  transform: (value: T) => U
) {
  let cachedResult = transform(atom.get?.() || atom.getValue?.());
  const subscribers = new Set<(value: U) => void>();

  atom.subscribe?.((value: T) => {
    const newResult = transform(value);
    if (newResult !== cachedResult) {
      cachedResult = newResult;
      subscribers.forEach((cb) => cb(newResult));
    }
  });

  return {
    get(): U {
      return cachedResult;
    },

    subscribe(callback: (value: U) => void) {
      subscribers.add(callback);
      callback(cachedResult);
      return () => subscribers.delete(callback);
    },
  };
}
