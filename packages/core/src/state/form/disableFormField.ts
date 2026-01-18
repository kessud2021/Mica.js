/**
 * Disables a form field from being edited
 * @param form - The form state object
 * @param key - Field key to disable
 * @returns Disable handler object
 */
export default function disableFormField<T extends Record<string, any>, K extends keyof T>(
  form: any,
  key: K
) {
  const disabledFields = new Set<K>();

  return {
    disable(): void {
      disabledFields.add(key);
    },

    enable(): void {
      disabledFields.delete(key);
    },

    isDisabled(): boolean {
      return disabledFields.has(key);
    },

    toggleDisable(): void {
      if (disabledFields.has(key)) {
        disabledFields.delete(key);
      } else {
        disabledFields.add(key);
      }
    },
  };
}
