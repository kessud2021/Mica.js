/**
 * Creates a selector from atom values with identity comparison
 * @param atom - The atom to select from
 * @param selector - Function to extract value
 * @returns Selector with get method
 */
export default function atomSelector<T, U>(
  atom: any,
  selector: (value: T) => U
) {
  let lastValue = atom.get?.() || atom.getValue?.();
  let lastResult = selector(lastValue);
  const subscribers = new Set<(value: U) => void>();

  atom.subscribe?.((newValue: T) => {
    if (newValue !== lastValue) {
      lastValue = newValue;
      const newResult = selector(newValue);
      if (newResult !== lastResult) {
        lastResult = newResult;
        subscribers.forEach((cb) => cb(newResult));
      }
    }
  });

  return {
    get(): U {
      return lastResult;
    },

    subscribe(callback: (value: U) => void) {
      subscribers.add(callback);
      callback(lastResult);
      return () => subscribers.delete(callback);
    },
  };
}
