/**
 * Throttles atom updates to at most one per duration
 * @param atom - The source atom
 * @param ms - Throttle duration in milliseconds
 * @returns Throttled atom
 */
export default function throttleAtom<T>(atom: any, ms: number) {
  let currentValue = atom.get?.() || atom.getValue?.();
  let lastUpdate = 0;
  const subscribers = new Set<(value: T) => void>();

  atom.subscribe?.((value: T) => {
    const now = Date.now();
    if (now - lastUpdate >= ms) {
      lastUpdate = now;
      currentValue = value;
      subscribers.forEach((cb) => cb(value));
    }
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
  };
}
