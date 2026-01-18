/**
 * Validates store state against a schema
 * @param store - The store object
 * @param schema - Validation schema
 * @returns Validation result
 */
export default function validateStore<T extends Record<string, any>>(
  store: any,
  schema: { [K in keyof T]?: (value: T[K]) => boolean }
): { valid: boolean; errors?: Record<string, string> } {
  const state = store.getState?.();
  const errors: Record<string, string> = {};
  let valid = true;

  for (const key in schema) {
    const validator = schema[key];
    if (validator && !validator(state[key])) {
      errors[key] = `Invalid value for ${String(key)}`;
      valid = false;
    }
  }

  return { valid, errors: valid ? undefined : errors };
}
