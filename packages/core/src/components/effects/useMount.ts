import { useEffect } from 'react';

const useMount = (callback: () => void | (() => void)): void => {
  useEffect(callback, []);
};

export default useMount;
