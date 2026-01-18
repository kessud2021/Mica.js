/**
 * Groups multiple atom updates into a single transaction
 * @param atoms - Atoms to update
 * @param updates - Function that performs updates
 * @returns Unsubscribe function if needed
 */
export default function transactionAtom<T extends Record<string, any>>(
  atoms: T,
  updates: (atoms: T) => void
) {
  let batchNotified = false;
  const batchedSubscribers = new Set<() => void>();

  const originalSet = Object.values(atoms).map((atom: any) => {
    return atom.set.bind(atom);
  });

  Object.values(atoms).forEach((atom: any, index) => {
    const originalSetFn = originalSet[index];
    atom.set = function (value: any) {
      batchNotified = true;
      originalSetFn(value);
    };
  });

  return {
    execute(): void {
      updates(atoms);
      if (batchNotified) {
        batchedSubscribers.forEach((cb) => cb());
        batchNotified = false;
      }
    },

    onBatch(callback: () => void): () => void {
      batchedSubscribers.add(callback);
      return () => batchedSubscribers.delete(callback);
    },
  };
}
