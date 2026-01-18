/**
 * Combines multiple atoms into a single object
 * @param atoms - Map of key to atom
 * @returns Combined atom with all values
 */
export default function combineAtoms<T extends Record<string, any>>(
  atoms: { [K in keyof T]: T[K] }
) {
  const subscribers = new Set<(value: T) => void>();

  const getValue = () => {
    const result = {} as T;
    for (const key in atoms) {
      const atom = atoms[key];
      result[key] = atom.get?.() || atom.getValue?.();
    }
    return result;
  };

  let cachedValue = getValue();

  Object.values(atoms).forEach((atom: any) => {
    atom.subscribe?.(() => {
      const newValue = getValue();
      if (JSON.stringify(newValue) !== JSON.stringify(cachedValue)) {
        cachedValue = newValue;
        subscribers.forEach((cb) => cb(newValue));
      }
    });
  });

  return {
    get(): T {
      return cachedValue;
    },

    subscribe(callback: (value: T) => void) {
      subscribers.add(callback);
      callback(cachedValue);
      return () => subscribers.delete(callback);
    },
  };
}
