/**
 * Debounces state updates
 * @param state - The state to debounce
 * @param ms - Debounce delay in milliseconds
 * @returns Debounced state
 */
export default function debounceState<T>(state: any, ms: number) {
  let timeoutId: NodeJS.Timeout | null = null;
  let currentValue = state.get?.() || state.getValue?.();
  const subscribers = new Set<(value: T) => void>();

  state.subscribe?.((value: T) => {
    if (timeoutId) clearTimeout(timeoutId);

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
