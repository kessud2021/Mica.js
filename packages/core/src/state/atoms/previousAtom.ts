/**
 * Tracks the previous value of an atom
 * @param atom - The atom to track
 * @returns Object with get and getPrevious methods
 */
export default function previousAtom<T>(atom: any) {
  let current = atom.get?.() || atom.getValue?.();
  let previous: T | undefined = undefined;
  const subscribers = new Set<(state: any) => void>();

  atom.subscribe?.((value: T) => {
    if (value !== current) {
      previous = current;
      current = value;
      subscribers.forEach((cb) => cb({ current, previous }));
    }
  });

  return {
    get(): T {
      return current;
    },

    getPrevious(): T | undefined {
      return previous;
    },

    subscribe(callback: (state: any) => void) {
      subscribers.add(callback);
      callback({ current, previous });
      return () => subscribers.delete(callback);
    },
  };
}
