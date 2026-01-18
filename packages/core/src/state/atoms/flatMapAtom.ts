/**
 * Flat maps an atom with nested values
 * @param atom - The source atom
 * @param mapper - Mapping function
 * @returns Flat mapped atom
 */
export default function flatMapAtom<T, U>(
  atom: any,
  mapper: (value: T) => U[]
) {
  let mapped = mapper(atom.get?.() || atom.getValue?.());
  const subscribers = new Set<(value: U[]) => void>();

  atom.subscribe?.((value: T) => {
    const newMapped = mapper(value);
    if (JSON.stringify(newMapped) !== JSON.stringify(mapped)) {
      mapped = newMapped;
      subscribers.forEach((cb) => cb(newMapped));
    }
  });

  return {
    get(): U[] {
      return mapped;
    },

    subscribe(callback: (value: U[]) => void) {
      subscribers.add(callback);
      callback(mapped);
      return () => subscribers.delete(callback);
    },
  };
}
