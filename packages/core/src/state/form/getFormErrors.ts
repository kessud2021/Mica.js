/**
 * Gets all form errors
 * @param form - The form state object
 * @returns Map of field errors
 */
export default function getFormErrors<T extends Record<string, any>>(
  form: any
): Partial<Record<keyof T, string>> {
  return form.getErrors?.();
}
