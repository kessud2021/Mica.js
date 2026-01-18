/**
 * Chains atoms together in sequence
 * @param atoms - Atoms to chain
 * @param composer - Function to compose atoms
 * @returns Composed atom
 */
export default function chainAtoms<T>(
  atoms: any[],
  composer: (...values: any[]) => T
) {
  let result = composer(...atoms.map((a) => a.get?.() || a.getValue?.()));
  const subscribers = new Set<(value: T) => void>();

  atoms.forEach((atom) => {
    atom.subscribe?.(() => {
      const newResult = composer(...atoms.map((a) => a.get?.() || a.getValue?.()));
      if (newResult !== result) {
        result = newResult;
        subscribers.forEach((cb) => cb(newResult));
      }
    });
  });

  return {
    get(): T {
      return result;
    },

    subscribe(callback: (value: T) => void) {
      subscribers.add(callback);
      callback(result);
      return () => subscribers.delete(callback);
    },
  };
}
