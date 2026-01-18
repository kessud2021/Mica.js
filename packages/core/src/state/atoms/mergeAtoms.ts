/**
 * Merges multiple atoms into one
 * @param atoms - Atoms to merge
 * @returns Merged atom
 */
export default function mergeAtoms<T>(atoms: any[]) {
  let lastEmitter = -1;
  const subscribers = new Set<(value: any) => void>();

  atoms.forEach((atom, index) => {
    atom.subscribe?.((value: T) => {
      lastEmitter = index;
      subscribers.forEach((cb) => cb(value));
    });
  });

  return {
    subscribe(callback: (value: T) => void) {
      subscribers.add(callback);
      if (lastEmitter >= 0) {
        const value = atoms[lastEmitter].get?.() || atoms[lastEmitter].getValue?.();
        callback(value);
      }
      return () => subscribers.delete(callback);
    },

    getLastEmitter(): number {
      return lastEmitter;
    },
  };
}
