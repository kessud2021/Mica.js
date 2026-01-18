/**
 * Gets all form values
 * @param form - The form state object
 * @returns All form values
 */
export default function getFormValues<T extends Record<string, any>>(form: any): T {
  return form.getValues?.();
}
