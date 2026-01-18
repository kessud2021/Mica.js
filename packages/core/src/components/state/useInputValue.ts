import { useState, useCallback } from 'react';

type UseInputValueReturn = {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  setValue: (value: string) => void;
  reset: () => void;
};

const useInputValue = (initialValue: string = ''): UseInputValueReturn => {
  const [value, setValueState] = useState(initialValue);

  const onChange = useCallback((e: { target: { value: string } }) => {
    setValueState(e.target.value);
  }, []);

  const setValue = useCallback((val: string) => {
    setValueState(val);
  }, []);

  const reset = useCallback(() => {
    setValueState(initialValue);
  }, [initialValue]);

  return { value, onChange, setValue, reset };
};

export default useInputValue;
