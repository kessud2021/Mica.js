/**
 * Sets multiple form values
 * @param form - The form state object
 * @param values - Values to set
 */
export default function setFormValues<T extends Record<string, any>>(
  form: any,
  values: Partial<T>
): void {
  form.setValues?.(values);
}
