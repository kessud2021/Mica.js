/**
 * Debounces atom updates to wait for specified duration of inactivity
 * @param atom - The source atom
 * @param ms - Debounce duration in milliseconds
 * @returns Debounced atom
 */
export default function debounceAtom<T>(atom: any, ms: number) {
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
