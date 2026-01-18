import { useEffect, useState } from 'react';

const usePortal = (elementId?: string): HTMLElement | null => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = elementId ? document.getElementById(elementId) : document.body;
    setElement(el);
  }, [elementId]);

  return element;
};

export default usePortal;
