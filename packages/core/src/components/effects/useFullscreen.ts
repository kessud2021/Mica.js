import { useRef, useState, useCallback } from 'react';

type UseFullscreenReturn = {
  ref: React.RefObject<HTMLDivElement>;
  isFullscreen: boolean;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
};

const useFullscreen = (): UseFullscreenReturn => {
  const ref = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enter = useCallback(async () => {
    if (ref.current) {
      try {
        await (ref.current as any).requestFullscreen?.();
        setIsFullscreen(true);
      } catch (error) {
        console.error('Fullscreen request failed:', error);
      }
    }
  }, []);

  const exit = useCallback(async () => {
    try {
      await document.exitFullscreen?.();
      setIsFullscreen(false);
    } catch (error) {
      console.error('Exit fullscreen failed:', error);
    }
  }, []);

  return { ref, isFullscreen, enter, exit };
};

export default useFullscreen;
