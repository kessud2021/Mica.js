/**
 * Creates a reactive signal - a simple state value with change tracking
 * @param initialValue - The initial signal value
 * @returns Signal object with get, set, and watch methods
 */
export default function createSignal<T>(initialValue: T) {
  let value = initialValue;
  const watchers = new Set<(newValue: T, oldValue: T) => void>();

  return {
    get(): T {
      return value;
    },

    set(newValue: T): void {
      const oldValue = value;
      if (oldValue !== newValue) {
        value = newValue;
        watchers.forEach((watcher) => watcher(newValue, oldValue));
      }
    },

    watch(callback: (newValue: T, oldValue: T) => void): () => void {
      watchers.add(callback);
      return () => {
        watchers.delete(callback);
      };
    },

    peek(): T {
      return value;
    },
  };
}
