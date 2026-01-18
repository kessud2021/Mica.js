/**
 * Creates a selector - a derived value from one or more atoms
 * @param atomOrAtoms - Source atom(s) to select from
 * @param selector - Function to compute the derived value
 * @returns Selector object with get and subscribe methods
 */
export default function createSelector<T, U>(
  atomOrAtoms: any | any[],
  selector: (...args: any[]) => U
) {
  const atoms = Array.isArray(atomOrAtoms) ? atomOrAtoms : [atomOrAtoms];
  const subscribers = new Set<(value: U) => void>();
  let cachedValue: U;

  const computeValue = () => {
    const values = atoms.map((atom: any) => atom.get?.() || atom.getValue?.());
    return selector(...values);
  };

  cachedValue = computeValue();

  const unsubscribers = atoms.map((atom: any) => {
    return atom.subscribe?.((value: any) => {
      const newValue = computeValue();
      if (newValue !== cachedValue) {
        cachedValue = newValue;
        subscribers.forEach((cb) => cb(newValue));
      }
    });
  });

  return {
    get(): U {
      return cachedValue;
    },

    subscribe(callback: (value: U) => void): () => void {
      subscribers.add(callback);
      callback(cachedValue);
      return () => {
        subscribers.delete(callback);
      };
    },

    cleanup(): void {
      unsubscribers.forEach((unsubscribe: any) => unsubscribe?.());
    },
  };
}
