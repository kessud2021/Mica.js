/**
 * Splits a compound atom into individual atoms
 * @param atom - The atom to split
 * @param keys - Keys to extract from the atom value
 * @returns Map of key to atom
 */
export default function splitAtom<T extends Record<string, any>, K extends keyof T>(
  atom: any,
  keys: K[]
) {
  const result: Partial<Record<K, any>> = {};

  keys.forEach((key) => {
    result[key] = {
      get() {
        return atom.get?.()[key];
      },

      set(value: any) {
        const current = atom.get?.() || {};
        atom.set?.({ ...current, [key]: value });
      },

      subscribe(callback: (value: any) => void) {
        return atom.subscribe?.((newValue: T) => {
          callback(newValue[key]);
        });
      },
    };
  });

  return result;
}
