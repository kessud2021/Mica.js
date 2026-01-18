/**
 * Checks if a field is touched
 * @param form - The form state object
 * @param key - Field key
 * @returns True if field is touched
 */
export default function isFieldTouched<T extends Record<string, any>, K extends keyof T>(
  form: any,
  key: K
): boolean {
  return form.isTouched?.(key) || false;
}
