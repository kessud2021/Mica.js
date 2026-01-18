import { useReducer } from 'react';
import type { Reducer, Dispatch } from 'react';

type ReducerWithCallback<S, A> = (state: S, action: A, prevState?: S) => S;

const useReducerCallback = <S, A>(
  reducer: ReducerWithCallback<S, A>,
  initialState: S,
  onStateChange?: (state: S, prevState: S) => void,
) => {
  let prevStateRef: S = initialState;

  const wrappedReducer: Reducer<S, A> = (state, action) => {
    const newState = reducer(state, action, prevStateRef);
    if (onStateChange && newState !== prevStateRef) {
      onStateChange(newState, prevStateRef);
    }
    prevStateRef = newState;
    return newState;
  };

  return useReducer(wrappedReducer, initialState);
};

export default useReducerCallback;
