import { useState, useEffect } from 'react';

type UseFetchState<T> = {
  loading: boolean;
  error: Error | null;
  data: T | null;
};

const useFetch = <T,>(url: string, options?: RequestInit): UseFetchState<T> & { refetch: () => void } => {
  const [state, setState] = useState<UseFetchState<T>>({
    loading: true,
    error: null,
    data: null,
  });

  const refetch = () => {
    setState({ loading: true, error: null, data: null });
    fetch(url, options)
      .then(res => res.json())
      .then(data => setState({ loading: false, error: null, data }))
      .catch(error => setState({ loading: false, error, data: null }));
  };

  useEffect(() => {
    refetch();
  }, [url]);

  return { ...state, refetch };
};

export default useFetch;
