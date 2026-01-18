import { useState, useCallback } from 'react';

type FormFieldState = {
  value: string;
  error: string | null;
  touched: boolean;
  dirty: boolean;
};

type FormFieldHelpers = {
  onChange: (e: { target: { value: string } }) => void;
  onBlur: () => void;
  setValue: (value: string) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

const useFormField = (
  initialValue: string = '',
  validate?: (value: string) => string | null,
): [FormFieldState, FormFieldHelpers] => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [dirty, setDirty] = useState(false);

  const onChange = useCallback((e: { target: { value: string } }) => {
    const newValue = e.target.value;
    setValue(newValue);
    setDirty(true);

    if (validate) {
      const validationError = validate(newValue);
      setError(validationError);
    }
  }, [validate]);

  const onBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
    setTouched(false);
    setDirty(false);
  }, [initialValue]);

  return [
    { value, error, touched, dirty },
    { onChange, onBlur, setValue, setError, reset },
  ];
};

export default useFormField;
