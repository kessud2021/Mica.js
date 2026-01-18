/**
 * Makes an atom read-only
 * @param atom - The atom
 * @returns Read-only atom
 */
export default function toReadonly<T>(atom: any) {
  return {
    get(): T {
      return atom.get?.() || atom.getValue?.();
    },

    subscribe(callback: (value: T) => void) {
      return atom.subscribe?.(callback) || (() => {});
    },
  };
}
