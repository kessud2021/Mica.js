import { useRef, useEffect } from 'react';
import type { MutableRefObject } from 'react';

type UseDOMReturn<T extends HTMLElement = HTMLDivElement> = {
  ref: MutableRefObject<T | null>;
  element: T | null;
};

const useDOM = <T extends HTMLElement = HTMLDivElement>(): UseDOMReturn<T> => {
  const ref = useRef<T>(null);
  const [element, setElement] = React.useState<T | null>(null);

  useEffect(() => {
    setElement(ref.current);
  }, []);

  return { ref, element };
};

export default useDOM;
