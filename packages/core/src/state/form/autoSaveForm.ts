/**
 * Auto-saves form values
 * @param form - The form state object
 * @param onSave - Save handler
 * @param debounceMs - Debounce interval
 * @returns Unsubscribe function
 */
export default function autoSaveForm<T extends Record<string, any>>(
  form: any,
  onSave: (values: T) => Promise<void> | void,
  debounceMs: number = 1000
): () => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return form.subscribe?.((state: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(async () => {
      try {
        await onSave(state.values);
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, debounceMs);
  }) || (() => {});
}
