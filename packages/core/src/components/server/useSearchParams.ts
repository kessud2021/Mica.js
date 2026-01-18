import { useState, useEffect } from 'react';

type UseSearchParamsReturn = [URLSearchParams, (params: Record<string, string>) => void];

const useSearchParams = (): UseSearchParamsReturn => {
  const [params, setParams] = useState<URLSearchParams>(
    () => new URLSearchParams(typeof window !== 'undefined' ? window.location.search : ''),
  );

  const updateParams = (newParams: Record<string, string>) => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(newParams)) {
      searchParams.set(key, value);
    }
    setParams(searchParams);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `?${searchParams.toString()}`);
    }
  };

  return [params, updateParams];
};

export default useSearchParams;
