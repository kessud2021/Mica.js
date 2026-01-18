/**
 * Buffers atom updates
 * @param atom - The atom
 * @param size - Buffer size
 * @returns Buffered atom
 */
export default function bufferAtom<T>(atom: any, size: number) {
  const buffer: T[] = [];
  let currentValue = atom.get?.() || atom.getValue?.();
  const subscribers = new Set<(value: T[]) => void>();

  atom.subscribe?.((value: T) => {
    buffer.push(value);
    currentValue = value;
    if (buffer.length >= size) {
      const buffered = [...buffer];
      subscribers.forEach((cb) => cb(buffered));
      buffer.length = 0;
    }
  });

  return {
    get(): T {
      return currentValue;
    },

    getBuffer(): T[] {
      return [...buffer];
    },

    subscribe(callback: (value: T[]) => void) {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    },

    flush(): T[] {
      if (buffer.length > 0) {
        const buffered = [...buffer];
        buffer.length = 0;
        return buffered;
      }
      return [];
    },
  };
}
