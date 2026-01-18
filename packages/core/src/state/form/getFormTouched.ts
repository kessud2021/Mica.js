/**
 * Gets touched fields from form
 * @param form - The form state object
 * @returns Touched fields
 */
export default function getFormTouched<T extends Record<string, any>>(
  form: any
): Partial<Record<keyof T, boolean>> {
  return form.getTouched?.();
}
