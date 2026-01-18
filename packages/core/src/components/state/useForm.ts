import { useState, useCallback } from 'react';

type FormState<T extends Record<string, any>> = T & { errors: Record<string, string | null> };

type FormHelpers<T extends Record<string, any>> = {
  setValue: (name: keyof T, value: any) => void;
  setError: (name: keyof T, error: string | null) => void;
  setValues: (values: Partial<T>) => void;
  reset: (values?: Partial<T>) => void;
  submit: (onSubmit: (values: T) => Promise<void> | void) => Promise<void>;
};

const useForm = <T extends Record<string, any> = {}>(
  initialValues: T,
): [FormState<T>, FormHelpers<T>] => {
  const [values, setValuesState] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const setValue = useCallback((name: keyof T, value: any) => {
    setValuesState(v => ({ ...v, [name]: value }));
  }, []);

  const setError = useCallback((name: keyof T, error: string | null) => {
    setErrors(e => ({ ...e, [name]: error }));
  }, []);

  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState(v => ({ ...v, ...newValues }));
  }, []);

  const reset = useCallback((newValues?: Partial<T>) => {
    setValuesState(newValues ? { ...initialValues, ...newValues } : initialValues);
    setErrors({});
  }, [initialValues]);

  const submit = useCallback(
    async (onSubmit: (values: T) => Promise<void> | void) => {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    },
    [values],
  );

  return [
    { ...values, errors },
    { setValue, setError, setValues, reset, submit },
  ];
};

export default useForm;
