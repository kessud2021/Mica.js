/**
 * Syncs state between two sources
 * @param source - Source state
 * @param target - Target state
 * @returns Unsubscribe function
 */
export default function syncState<T>(source: any, target: any): () => void {
  return source.subscribe?.((value: T) => {
    target.set?.(value);
  }) || (() => {});
}
