/**
 * Gets error for a specific field
 * @param form - The form state object
 * @param key - Field key
 * @returns Field error or undefined
 */
export default function getFieldError<T extends Record<string, any>, K extends keyof T>(
  form: any,
  key: K
): string | undefined {
  return form.getError?.(key);
}
