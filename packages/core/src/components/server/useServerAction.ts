import { useState, useCallback } from 'react';

type UseServerActionState<T = any> = {
  loading: boolean;
  error: Error | null;
  data: T | null;
};

const useServerAction = <T = void, R = any>(
  action: (payload: T) => Promise<R>,
): UseServerActionState<R> & { execute: (payload: T) => Promise<R | null> } => {
  const [state, setState] = useState<UseServerActionState<R>>({
    loading: false,
    error: null,
    data: null,
  });

  const execute = useCallback(
    async (payload: T): Promise<R | null> => {
      setState({ loading: true, error: null, data: null });
      try {
        const result = await action(payload);
        setState({ loading: false, error: null, data: result });
        return result;
      } catch (error) {
        setState({ loading: false, error: error as Error, data: null });
        return null;
      }
    },
    [action],
  );

  return { ...state, execute };
};

export default useServerAction;
