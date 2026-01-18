import { useState, useCallback } from 'react';

type UseToggleReturn = [boolean, () => void, (value: boolean) => void];

const useToggle = (initialValue: boolean = false): UseToggleReturn => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  const set = useCallback((val: boolean) => {
    setValue(val);
  }, []);

  return [value, toggle, set];
};

export default useToggle;
