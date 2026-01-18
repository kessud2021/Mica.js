/**
 * Sets a timeout for atom emissions
 * @param atom - The atom
 * @param ms - Timeout in milliseconds
 * @returns Atom with timeout
 */
export default function timeoutAtom<T>(atom: any, ms: number) {
  let currentValue = atom.get?.() || atom.getValue?.();
  let timeoutId: NodeJS.Timeout | null = null;
  const subscribers = new Set<(value: T) => void>();

  atom.subscribe?.((value: T) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      currentValue = value;
      subscribers.forEach((cb) => cb(value));
    }, ms);
  });

  return {
    get(): T {
      return currentValue;
    },

    subscribe(callback: (value: T) => void) {
      subscribers.add(callback);
      callback(currentValue);
      return () => subscribers.delete(callback);
    },

    cancel(): void {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    },
  };
}
