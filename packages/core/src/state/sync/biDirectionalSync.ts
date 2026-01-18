/**
 * Creates bi-directional sync between two states
 * @param stateA - First state
 * @param stateB - Second state
 * @returns Unsubscribe functions
 */
export default function biDirectionalSync<T>(stateA: any, stateB: any) {
  const unsubA = stateA.subscribe?.((value: T) => {
    stateB.set?.(value);
  });

  const unsubB = stateB.subscribe?.((value: T) => {
    stateA.set?.(value);
  });

  return {
    disconnect(): void {
      unsubA?.();
      unsubB?.();
    },
  };
}
