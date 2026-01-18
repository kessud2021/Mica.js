/**
 * Resets a single field to initial value
 * @param form - The form state object
 * @param key - Field key
 * @param initialValue - Initial value to reset to
 */
export default function resetField<T extends Record<string, any>, K extends keyof T>(
  form: any,
  key: K,
  initialValue: T[K]
): void {
  form.setValue?.(key, initialValue);
  form.clearError?.(key);
}
