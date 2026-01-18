/**
 * Creates a form state object
 * @param initialValues - Initial form values
 * @returns Form state with methods
 */
export default function createFormState<T extends Record<string, any>>(
  initialValues: T
) {
  let values = { ...initialValues };
  let errors: Partial<Record<keyof T, string>> = {};
  let touched: Partial<Record<keyof T, boolean>> = {};
  let dirty = false;

  const subscribers = new Set<(state: any) => void>();

  const notify = () => {
    subscribers.forEach((cb) =>
      cb({ values, errors, touched, dirty, isValid: Object.keys(errors).length === 0 })
    );
  };

  return {
    getValues(): T {
      return { ...values };
    },

    getValue<K extends keyof T>(key: K): T[K] {
      return values[key];
    },

    setValues(newValues: Partial<T>): void {
      values = { ...values, ...newValues };
      dirty = true;
      notify();
    },

    setValue<K extends keyof T>(key: K, value: T[K]): void {
      values[key] = value;
      dirty = true;
      notify();
    },

    getErrors(): Partial<Record<keyof T, string>> {
      return { ...errors };
    },

    getError<K extends keyof T>(key: K): string | undefined {
      return errors[key];
    },

    setErrors(newErrors: Partial<Record<keyof T, string>>): void {
      errors = { ...newErrors };
      notify();
    },

    setError<K extends keyof T>(key: K, error: string): void {
      errors[key] = error;
      notify();
    },

    clearError<K extends keyof T>(key: K): void {
      delete errors[key];
      notify();
    },

    getTouched(): Partial<Record<keyof T, boolean>> {
      return { ...touched };
    },

    isTouched<K extends keyof T>(key: K): boolean {
      return touched[key] || false;
    },

    setTouched(newTouched: Partial<Record<keyof T, boolean>>): void {
      touched = { ...touched, ...newTouched };
      notify();
    },

    touch<K extends keyof T>(key: K): void {
      touched[key] = true;
      notify();
    },

    isDirty(): boolean {
      return dirty;
    },

    isValid(): boolean {
      return Object.keys(errors).length === 0;
    },

    reset(): void {
      values = { ...initialValues };
      errors = {};
      touched = {};
      dirty = false;
      notify();
    },

    subscribe(callback: (state: any) => void): () => void {
      subscribers.add(callback);
      callback({
        values,
        errors,
        touched,
        dirty,
        isValid: Object.keys(errors).length === 0,
      });
      return () => subscribers.delete(callback);
    },
  };
}
