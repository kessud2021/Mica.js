/**
 * Gets the diff of form changes
 * @param form - The form state object
 * @param initialValues - Initial values to compare against
 * @returns Map of changed fields
 */
export default function getFormDiff<T extends Record<string, any>>(
  form: any,
  initialValues: T
): Partial<Record<keyof T, { from: any; to: any }>> {
  const currentValues = form.getValues?.();
  const diff: Partial<Record<keyof T, { from: any; to: any }>> = {};

  for (const key in currentValues) {
    if (currentValues[key] !== initialValues[key]) {
      diff[key as keyof T] = { from: initialValues[key], to: currentValues[key] };
    }
  }

  return diff;
}
