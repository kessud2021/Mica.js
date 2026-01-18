/**
 * Creates an atom that depends on another atom
 * @param sourceAtom - The source atom
 * @param transform - Function to transform the source value
 * @returns Dependent atom
 */
export default function dependentAtom<T, U>(
  sourceAtom: any,
  transform: (value: T) => U
) {
  let value = transform(sourceAtom.get?.() || sourceAtom.getValue?.());
  const subscribers = new Set<(value: U) => void>();

  sourceAtom.subscribe?.((sourceValue: T) => {
    const newValue = transform(sourceValue);
    if (newValue !== value) {
      value = newValue;
      subscribers.forEach((cb) => cb(newValue));
    }
  });

  return {
    get(): U {
      return value;
    },

    subscribe(callback: (value: U) => void) {
      subscribers.add(callback);
      callback(value);
      return () => subscribers.delete(callback);
    },

    getSource(): any {
      return sourceAtom;
    },
  };
}
