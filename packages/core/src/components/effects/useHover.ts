import { useRef, useState } from 'react';

type UseHoverReturn = [React.RefObject<HTMLElement>, boolean];

const useHover = (): UseHoverReturn => {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return [ref, isHovered];
};

export default useHover;
