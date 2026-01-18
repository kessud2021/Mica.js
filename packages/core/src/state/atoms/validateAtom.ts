/**
 * Validates atom values against a schema
 * @param atom - The atom to validate
 * @param validate - Validation function
 * @returns Atom with validation
 */
export default function validateAtom<T>(
  atom: any,
  validate: (value: T) => { valid: boolean; error?: string }
) {
  let currentValue = atom.get?.() || atom.getValue?.();
  let validationResult = validate(currentValue);
  const subscribers = new Set<(state: any) => void>();

  atom.subscribe?.((value: T) => {
    currentValue = value;
    validationResult = validate(value);
    subscribers.forEach((cb) => cb({ value, validationResult }));
  });

  return {
    get(): T {
      return currentValue;
    },

    isValid(): boolean {
      return validationResult.valid;
    },

    getError(): string | undefined {
      return validationResult.error;
    },

    subscribe(callback: (state: any) => void) {
      subscribers.add(callback);
      callback({ value: currentValue, validationResult });
      return () => subscribers.delete(callback);
    },
  };
}
