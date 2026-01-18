/**
 * Checks if form is valid
 * @param form - The form state object
 * @returns True if form is valid
 */
export default function isFormValid(form: any): boolean {
  return form.isValid?.() || false;
}
