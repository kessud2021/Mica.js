import { useEffect } from 'react';

type KeyUpHandler = (event: KeyboardEvent) => void;

const useKeyUp = (key: string | string[], handler: KeyUpHandler): void => {
  useEffect(() => {
    const keys = Array.isArray(key) ? key : [key];
    const lowerKeys = keys.map(k => k.toLowerCase());

    const handleKeyUp = (event: KeyboardEvent) => {
      if (lowerKeys.includes(event.key.toLowerCase())) {
        handler(event);
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [key, handler]);
};

export default useKeyUp;
