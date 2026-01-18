import { useEffect, useRef, useState } from 'react';

type IntersectionEntry = {
  isIntersecting: boolean;
  intersectionRatio: number;
};

const useIntersectionObserver = (
  options?: IntersectionObserverInit,
): [IntersectionEntry | null, (el: HTMLElement | null) => void] => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [entry, setEntry] = useState<IntersectionEntry | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        setEntry({
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
        });
      }
    }, options);

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [entry, (el: HTMLElement | null) => {
    elementRef.current = el;
  }];
};

export default useIntersectionObserver;
