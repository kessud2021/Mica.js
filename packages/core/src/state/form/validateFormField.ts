/**
 * Validates a single form field
 * @param form - The form state object
 * @param key - Field key
 * @param validator - Validation function
 */
export default function validateFormField<T extends Record<string, any>, K extends keyof T>(
  form: any,
  key: K,
  validator: (value: T[K]) => string | undefined
): void {
  const value = form.getValue?.(key);
  const error = validator(value);

  if (error) {
    form.setError?.(key, error);
  } else {
    form.clearError?.(key);
  }
}
