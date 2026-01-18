import { useId as reactUseId } from 'react';

const useId = (prefix?: string): string => {
  const id = reactUseId();
  return prefix ? `${prefix}-${id}` : id;
};

export default useId;
