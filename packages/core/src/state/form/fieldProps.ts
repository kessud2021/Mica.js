/**
 * Gets props for a form field
 * @param form - The form state object
 * @param key - Field key
 * @returns Props object for field binding
 */
export default function fieldProps<T extends Record<string, any>, K extends keyof T>(
  form: any,
  key: K
) {
  return {
    name: String(key),
    value: form.getValue?.(key) || '',
    onChange: (e: Event) => {
      const target = e.target as HTMLInputElement;
      form.setValue?.(key, target.value);
    },
    onBlur: () => form.touch?.(key),
    error: form.getError?.(key),
    touched: form.isTouched?.(key),
  };
}
