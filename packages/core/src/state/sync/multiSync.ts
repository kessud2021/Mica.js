/**
 * Syncs one source to multiple targets
 * @param source - Source state
 * @param targets - Target states
 * @returns Unsubscribe function
 */
export default function multiSync<T>(source: any, targets: any[]): () => void {
  return source.subscribe?.((value: T) => {
    targets.forEach((target) => {
      target.set?.(value);
    });
  }) || (() => {});
}
