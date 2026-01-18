/**
 * Gets helper methods for form handling
 * @param form - The form state object
 * @returns Helper methods
 */
export default function formHelpers<T extends Record<string, any>>(form: any) {
  return {
    isDirty: () => form.isDirty?.(),
    isValid: () => form.isValid?.(),
    getValues: () => form.getValues?.(),
    getErrors: () => form.getErrors?.(),
    getTouched: () => form.getTouched?.(),
    reset: () => form.reset?.(),
    submit: (onSubmit: (values: T) => Promise<void> | void) =>
      form.subscribe?.((state: any) => {
        if (form.isValid?.()) {
          onSubmit(state.values);
        }
      }),
  };
}
