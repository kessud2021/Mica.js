import { useContext as reactUseContext } from 'react';
import type { Context } from 'react';

const useContext = <T = any>(context: Context<T | undefined>): T | undefined => {
  return reactUseContext(context);
};

export default useContext;
