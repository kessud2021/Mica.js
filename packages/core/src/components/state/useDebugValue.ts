import { useDebugValue as reactUseDebugValue } from 'react';

const useDebugValue = <T>(value: T, format?: (value: T) => string): void => {
  reactUseDebugValue(value, format);
};

export default useDebugValue;
