import { useEffect, useRef } from 'react';

const useMutationObserver = (
  callback: (mutations: MutationRecord[]) => void,
  options?: MutationObserverInit,
): ((el: HTMLElement | null) => void) => {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new MutationObserver(callback);
    observer.observe(elementRef.current, options || {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return (el: HTMLElement | null) => {
    elementRef.current = el;
  };
};

export default useMutationObserver;
