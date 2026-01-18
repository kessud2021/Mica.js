import { useEffect } from 'react';

type KeyDownHandler = (event: KeyboardEvent) => void;

const useKeyDown = (key: string | string[], handler: KeyDownHandler): void => {
  useEffect(() => {
    const keys = Array.isArray(key) ? key : [key];
    const lowerKeys = keys.map(k => k.toLowerCase());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (lowerKeys.includes(event.key.toLowerCase())) {
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, handler]);
};

export default useKeyDown;
