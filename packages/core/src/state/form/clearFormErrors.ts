/**
 * Clears all form errors
 * @param form - The form state object
 */
export default function clearFormErrors(form: any): void {
  form.setErrors?.({});
}
