/**
 * Validates entire form
 * @param form - The form state object
 * @param schema - Validation schema
 * @returns Validation result
 */
export default function validateForm<T extends Record<string, any>>(
  form: any,
  schema: { [K in keyof T]?: (value: T[K]) => string | undefined }
): boolean {
  const values = form.getValues?.();
  const errors: Partial<Record<keyof T, string>> = {};

  for (const key in schema) {
    const validator = schema[key as keyof T];
    if (validator) {
      const error = validator(values[key as keyof T]);
      if (error) {
        errors[key as keyof T] = error;
      }
    }
  }

  form.setErrors?.(errors);
  return Object.keys(errors).length === 0;
}
