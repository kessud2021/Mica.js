/**
 * Sets a form field value
 * @param form - The form state object
 * @param key - Field key
 * @param value - New value
 */
export default function setFormValue<T extends Record<string, any>, K extends keyof T>(
  form: any,
  key: K,
  value: T[K]
): void {
  form.setValue?.(key, value);
}
