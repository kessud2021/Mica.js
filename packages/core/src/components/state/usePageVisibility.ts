import { useState, useEffect } from 'react';

const usePageVisibility = (): 'visible' | 'hidden' => {
  const [visibility, setVisibility] = useState<'visible' | 'hidden'>('visible');

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      setVisibility(document.hidden ? 'hidden' : 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return visibility;
};

export default usePageVisibility;
