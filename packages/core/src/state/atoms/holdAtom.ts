/**
 * Holds atom updates until explicitly released
 * @param atom - The atom to hold
 * @returns Held atom with release method
 */
export default function holdAtom<T>(atom: any) {
  let held: T[] = [];
  let isHolding = true;
  let currentValue = atom.get?.() || atom.getValue?.();
  const subscribers = new Set<(value: T) => void>();

  atom.subscribe?.((value: T) => {
    if (isHolding) {
      held.push(value);
    } else {
      currentValue = value;
      subscribers.forEach((cb) => cb(value));
    }
  });

  return {
    get(): T {
      return currentValue;
    },

    hold(): void {
      isHolding = true;
    },

    release(): void {
      isHolding = false;
      held.forEach((value) => {
        currentValue = value;
        subscribers.forEach((cb) => cb(value));
      });
      held = [];
    },

    subscribe(callback: (value: T) => void) {
      subscribers.add(callback);
      callback(currentValue);
      return () => subscribers.delete(callback);
    },
  };
}
