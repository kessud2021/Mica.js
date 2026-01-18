import { flushSync } from 'react-dom';
import { useCallback } from 'react';

const useFlush = () => {
  return useCallback((callback: () => void) => {
    flushSync(callback);
  }, []);
};

export default useFlush;
