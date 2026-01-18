import { useState, useCallback } from 'react';

type UseSessionStorageReturn<T> = [T, (value: T) => void, () => void];

const useSessionStorage = <T,>(key: string, initialValue: T): UseSessionStorageReturn<T> => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, JSON.stringify(value));
        }
      } catch {
        console.error('Failed to set session storage');
      }
    },
    [key],
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key);
      }
    } catch {
      console.error('Failed to remove from session storage');
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

export default useSessionStorage;
