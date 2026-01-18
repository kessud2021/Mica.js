/**
 * Watches an atom for changes and runs side effects
 * @param atom - The atom to watch
 * @param callback - Function to call when atom changes
 * @returns Unsubscribe function
 */
export default function watchAtom<T>(
  atom: any,
  callback: (newValue: T, oldValue?: T) => void
): () => void {
  let oldValue = atom.get?.() || atom.getValue?.();
  callback(oldValue);

  return atom.subscribe?.((newValue: T) => {
    if (newValue !== oldValue) {
      const prev = oldValue;
      oldValue = newValue;
      callback(newValue, prev);
    }
  });
}
