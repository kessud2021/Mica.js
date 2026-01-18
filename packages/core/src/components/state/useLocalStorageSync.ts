import { useState, useEffect, useCallback } from 'react';

type UseLocalStorageSyncReturn<T> = [T, (value: T) => void];

const useLocalStorageSync = <T,>(key: string, initialValue: T): UseLocalStorageSyncReturn<T> => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValueAndSync = useCallback((newValue: T) => {
    setValue(newValue);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue));
        window.dispatchEvent(
          new StorageEvent('storage', { key, newValue: JSON.stringify(newValue) }),
        );
      } catch (error) {
        console.error('Failed to sync to localStorage:', error);
      }
    }
  }, [key]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setValue(JSON.parse(e.newValue));
        } catch {
          console.error('Failed to parse storage value');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [value, setValueAndSync];
};

export default useLocalStorageSync;
