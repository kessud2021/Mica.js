import { useCallback, useState } from 'react';

type UseAsyncCallbackState = {
  loading: boolean;
  error: Error | null;
};

const useAsyncCallback = <T extends (...args: any[]) => Promise<any>>(
  callback: T,
  onSuccess?: (result: any) => void,
  onError?: (error: Error) => void,
): [T, UseAsyncCallbackState] => {
  const [state, setState] = useState<UseAsyncCallbackState>({
    loading: false,
    error: null,
  });

  const wrappedCallback = useCallback(
    (async (...args: Parameters<T>) => {
      setState({ loading: true, error: null });
      try {
        const result = await callback(...args);
        setState({ loading: false, error: null });
        if (onSuccess) onSuccess(result);
        return result;
      } catch (error) {
        const err = error as Error;
        setState({ loading: false, error: err });
        if (onError) onError(err);
        throw error;
      }
    }) as T,
    [callback, onSuccess, onError],
  );

  return [wrappedCallback, state];
};

export default useAsyncCallback;
