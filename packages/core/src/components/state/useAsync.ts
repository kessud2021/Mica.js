import { useState, useEffect } from 'react';

type UseAsyncState<T> = {
  loading: boolean;
  error: Error | null;
  data: T | null;
};

const useAsync = <T,>(
  asyncFn: () => Promise<T>,
  immediate: boolean = true,
): UseAsyncState<T> & { execute: () => Promise<void> } => {
  const [state, setState] = useState<UseAsyncState<T>>({
    loading: immediate,
    error: null,
    data: null,
  });

  const execute = async () => {
    setState({ loading: true, error: null, data: null });
    try {
      const response = await asyncFn();
      setState({ loading: false, error: null, data: response });
    } catch (error) {
      setState({ loading: false, error: error as Error, data: null });
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, []);

  return { ...state, execute };
};

export default useAsync;
