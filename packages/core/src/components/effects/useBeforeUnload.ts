import { useEffect } from 'react';

const useBeforeUnload = (handler?: (e: BeforeUnloadEvent) => void): void => {
  useEffect(() => {
    if (!handler) return;

    window.addEventListener('beforeunload', handler);

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [handler]);
};

export default useBeforeUnload;
