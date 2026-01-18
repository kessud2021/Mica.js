import { useReducer as reactUseReducer } from 'react';
import type { Reducer, Dispatch } from 'react';

type UseReducerReturn<S, A> = [S, Dispatch<A>];

const useReducer = <S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
  init?: (initial: S) => S,
): UseReducerReturn<S, A> => {
  return reactUseReducer(reducer, initialState, init);
};

export default useReducer;
