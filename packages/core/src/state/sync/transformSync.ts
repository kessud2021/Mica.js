/**
 * Syncs state with transformation
 * @param source - Source state
 * @param target - Target state
 * @param transform - Transformation function
 * @returns Unsubscribe function
 */
export default function transformSync<T, U>(
  source: any,
  target: any,
  transform: (value: T) => U
): () => void {
  return source.subscribe?.((value: T) => {
    const transformed = transform(value);
    target.set?.(transformed);
  }) || (() => {});
}
