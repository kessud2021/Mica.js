import { useRef, useState } from 'react';

type UseFocusReturn = [React.RefObject<HTMLElement>, boolean];

const useFocus = (): UseFocusReturn => {
  const ref = useRef<HTMLElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return [ref, isFocused];
};

export default useFocus;
