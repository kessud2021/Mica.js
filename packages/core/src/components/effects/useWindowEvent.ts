import { useEffect } from 'react';

type EventListener = (event: Event) => void;

const useWindowEvent = (
  eventName: string,
  handler: EventListener,
  options?: AddEventListenerOptions,
): void => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener(eventName, handler, options);

    return () => {
      window.removeEventListener(eventName, handler, options);
    };
  }, [eventName, handler, options]);
};

export default useWindowEvent;
