/**
 * Subscribes to atom changes
 * @param atom - The atom to subscribe to
 * @param callback - Function to call on each update
 * @returns Unsubscribe function
 */
export default function subscribeAtom<T>(
  atom: any,
  callback: (value: T) => void
): () => void {
  return atom.subscribe?.(callback) || (() => {});
}
