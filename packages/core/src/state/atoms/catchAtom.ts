/**
 * Catches errors in an atom
 * @param atom - The atom
 * @param handler - Error handler
 * @returns Atom with error handling
 */
export default function catchAtom<T>(
  atom: any,
  handler: (error: Error) => T
) {
  let currentValue = atom.get?.() || atom.getValue?.();
  let lastError: Error | null = null;
  const subscribers = new Set<(value: T) => void>();

  atom.subscribe?.((value: T | Error) => {
    if (value instanceof Error) {
      lastError = value;
      const recovered = handler(value);
      currentValue = recovered;
      subscribers.forEach((cb) => cb(recovered));
    } else {
      currentValue = value;
      lastError = null;
      subscribers.forEach((cb) => cb(value));
    }
  });

  return {
    get(): T {
      return currentValue;
    },

    getLastError(): Error | null {
      return lastError;
    },

    subscribe(callback: (value: T) => void) {
      subscribers.add(callback);
      callback(currentValue);
      return () => subscribers.delete(callback);
    },
  };
}
