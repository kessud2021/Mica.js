/**
 * Patches a store with partial updates
 * @param store - The store object
 * @param patch - Partial state updates
 */
export default function patchStore<T extends Record<string, any>>(
  store: any,
  patch: Partial<T>
): void {
  store.setState?.(patch);
}
