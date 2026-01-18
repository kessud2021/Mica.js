/**
 * Compares current and previous values of an atom
 * @param atom - The atom to compare
 * @returns Object with comparison methods
 */
export default function compareAtom<T>(atom: any) {
  let current = atom.get?.() || atom.getValue?.();
  let previous = current;

  atom.subscribe?.((value: T) => {
    previous = current;
    current = value;
  });

  return {
    hasChanged(): boolean {
      return current !== previous;
    },

    getDiff(): { current: T; previous: T } {
      return { current, previous };
    },

    getCurrent(): T {
      return current;
    },

    getPrevious(): T {
      return previous;
    },
  };
}
