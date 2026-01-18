/**
 * Gets a form field value
 * @param form - The form state object
 * @param key - Field key
 * @returns Field value
 */
export default function getFormValue<T extends Record<string, any>, K extends keyof T>(
  form: any,
  key: K
): T[K] {
  return form.getValue?.(key);
}
