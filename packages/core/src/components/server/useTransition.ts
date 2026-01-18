import { useTransition as reactUseTransition } from 'react';

type UseTransitionReturn = [boolean, (callback: () => Promise<void>) => void];

const useTransition = (): UseTransitionReturn => {
  return reactUseTransition();
};

export default useTransition;
