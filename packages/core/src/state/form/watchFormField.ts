/**
 * Watches a form field for changes
 * @param form - The form state object
 * @param key - Field key
 * @param callback - Function to call on change
 * @returns Unsubscribe function
 */
export default function watchFormField<T extends Record<string, any>, K extends keyof T>(
  form: any,
  key: K,
  callback: (value: T[K], oldValue?: T[K]) => void
): () => void {
  let prevValue = form.getValue?.(key);
  callback(prevValue);

  return form.subscribe?.((state: any) => {
    const newValue = state.values[key];
    if (newValue !== prevValue) {
      const old = prevValue;
      prevValue = newValue;
      callback(newValue, old);
    }
  });
}
