import { useEffect, useRef } from 'react';

type ScrollPosition = { x: number; y: number };

const useScrollRestoration = (key?: string): void => {
  const scrollPositionsRef = useRef(new Map<string, ScrollPosition>());

  useEffect(() => {
    const k = key || 'default';
    const savedPosition = scrollPositionsRef.current.get(k);

    if (savedPosition) {
      window.scrollTo(savedPosition.x, savedPosition.y);
    }

    const handleScroll = () => {
      scrollPositionsRef.current.set(k, { x: window.scrollX, y: window.scrollY });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [key]);
};

export default useScrollRestoration;
