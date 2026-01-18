/**
 * Sets error for a field
 * @param form - The form state object
 * @param key - Field key
 * @param error - Error message
 */
export default function setFieldError<T extends Record<string, any>, K extends keyof T>(
  form: any,
  key: K,
  error: string
): void {
  form.setError?.(key, error);
}
