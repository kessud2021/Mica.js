/**
 * Creates an atom with undo/redo history
 * @param initialValue - Initial value
 * @param maxHistory - Maximum history entries
 * @returns Atom with history methods
 */
export default function historyAtom<T>(initialValue: T, maxHistory = 50) {
  const history: T[] = [initialValue];
  let currentIndex = 0;
  const subscribers = new Set<(value: T) => void>();

  return {
    get(): T {
      return history[currentIndex];
    },

    set(value: T | ((prev: T) => T)): void {
      const nextValue =
        typeof value === 'function' ? (value as (prev: T) => T)(history[currentIndex]) : value;

      if (nextValue !== history[currentIndex]) {
        history.splice(currentIndex + 1);
        history.push(nextValue);
        if (history.length > maxHistory) {
          history.shift();
        } else {
          currentIndex++;
        }
        subscribers.forEach((cb) => cb(nextValue));
      }
    },

    undo(): void {
      if (currentIndex > 0) {
        currentIndex--;
        subscribers.forEach((cb) => cb(history[currentIndex]));
      }
    },

    redo(): void {
      if (currentIndex < history.length - 1) {
        currentIndex++;
        subscribers.forEach((cb) => cb(history[currentIndex]));
      }
    },

    subscribe(callback: (value: T) => void) {
      subscribers.add(callback);
      callback(history[currentIndex]);
      return () => subscribers.delete(callback);
    },
  };
}
