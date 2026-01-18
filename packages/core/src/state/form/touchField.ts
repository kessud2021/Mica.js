/**
 * Marks a form field as touched
 * @param form - The form state object
 * @param key - Field key
 */
export default function touchField<T extends Record<string, any>, K extends keyof T>(
  form: any,
  key: K
): void {
  form.touch?.(key);
}
