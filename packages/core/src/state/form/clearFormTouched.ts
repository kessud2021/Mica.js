/**
 * Clears touched state from form
 * @param form - The form state object
 */
export default function clearFormTouched(form: any): void {
  form.setTouched?.({});
}
