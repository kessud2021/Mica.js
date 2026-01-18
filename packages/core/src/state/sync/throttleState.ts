/**
 * Throttles state updates
 * @param state - The state to throttle
 * @param ms - Throttle interval in milliseconds
 * @returns Throttled state
 */
export default function throttleState<T>(state: any, ms: number) {
  let lastUpdate = 0;
  let currentValue = state.get?.() || state.getValue?.();
  const subscribers = new Set<(value: T) => void>();

  state.subscribe?.((value: T) => {
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
