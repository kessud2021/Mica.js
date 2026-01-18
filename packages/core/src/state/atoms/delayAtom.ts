/**
 * Delays atom updates by a specified duration
 * @param atom - The source atom
 * @param ms - Delay in milliseconds
 * @returns Delayed atom
 */
export default function delayAtom<T>(atom: any, ms: number) {
  let currentValue = atom.get?.() || atom.getValue?.();
  let timeoutId: NodeJS.Timeout | null = null;
  const subscribers = new Set<(value: T) => void>();

  atom.subscribe?.((value: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      currentValue = value;
      timeoutId = null;
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

    flush(): void {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    },
  };
}
