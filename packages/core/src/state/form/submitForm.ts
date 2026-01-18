/**
 * Submits a form
 * @param form - The form state object
 * @param onSubmit - Function to handle submission
 * @returns Promise with submission result
 */
export default async function submitForm<T extends Record<string, any>>(
  form: any,
  onSubmit: (values: T) => Promise<void> | void
): Promise<void> {
  const values = form.getValues?.();

  try {
    await onSubmit(values);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}
