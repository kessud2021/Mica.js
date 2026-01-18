import { useState, useCallback, useRef } from 'react';

type UseAsync2State<T> = {
  state: 'idle' | 'pending' | 'success' | 'error';
  data: T | null;
  error: Error | null;
};

const useAsync2 = <T,>(
  asyncFn: () => Promise<T>,
): UseAsync2State<T> & { execute: () => Promise<T | null> } => {
  const [state, setState] = useState<UseAsync2State<T>>({
    state: 'idle',
    data: null,
    error: null,
  });

  const isMountedRef = useRef(true);

  const execute = useCallback(async () => {
    setState({ state: 'pending', data: null, error: null });

    try {
      const result = await asyncFn();
      if (isMountedRef.current) {
        setState({ state: 'success', data: result, error: null });
      }
      return result;
    } catch (error) {
      if (isMountedRef.current) {
        setState({ state: 'error', data: null, error: error as Error });
      }
      return null;
    }
  }, [asyncFn]);

  return { ...state, execute };
};

export default useAsync2;
