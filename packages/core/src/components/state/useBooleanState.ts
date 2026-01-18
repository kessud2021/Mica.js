import { useState, useCallback } from 'react';

type UseBooleanStateReturn = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
};

const useBooleanState = (initialValue: boolean = false): UseBooleanStateReturn => {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return { value, setTrue, setFalse, toggle };
};

export default useBooleanState;
