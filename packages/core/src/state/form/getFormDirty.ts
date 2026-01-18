/**
 * Gets dirty state from form
 * @param form - The form state object
 * @returns True if form is dirty
 */
export default function getFormDirty(form: any): boolean {
  return form.isDirty?.() || false;
}
