/**
 * Defers updates to an atom using requestAnimationFrame
 * @param atom - The source atom
 * @returns Deferred atom
 */
export default function deferAtom<T>(atom: any) {
  let currentValue = atom.get?.() || atom.getValue?.();
  let frameId: number | null = null;
  const subscribers = new Set<(value: T) => void>();

  atom.subscribe?.((value: T) => {
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
    }

    frameId = requestAnimationFrame(() => {
      currentValue = value;
      frameId = null;
      subscribers.forEach((cb) => cb(value));
    });
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
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    },
  };
}
