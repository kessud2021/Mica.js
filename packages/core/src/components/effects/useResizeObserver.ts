import { useEffect, useRef, useState } from 'react';

type ResizeObserverEntry = {
  width: number;
  height: number;
};

const useResizeObserver = (): [ResizeObserverEntry | null, (el: HTMLElement | null) => void] => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [entry, setEntry] = useState<ResizeObserverEntry | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new (window as any).ResizeObserver((entries: any[]) => {
      for (const entry of entries) {
        setEntry({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [entry, (el: HTMLElement | null) => {
    elementRef.current = el;
  }];
};

export default useResizeObserver;
