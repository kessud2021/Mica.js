/**
 * Handles field blur event
 * @param form - The form state object
 * @param key - Field key
 * @param validator - Optional validator function
 */
export default function blurField<T extends Record<string, any>, K extends keyof T>(
  form: any,
  key: K,
  validator?: (value: T[K]) => string | undefined
): void {
  form.touch?.(key);

  if (validator) {
    const value = form.getValue?.(key);
    const error = validator(value);
    if (error) {
      form.setError?.(key, error);
    } else {
      form.clearError?.(key);
    }
  }
}
