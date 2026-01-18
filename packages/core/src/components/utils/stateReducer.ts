import { useReducer } from 'react';
import type { Reducer, Dispatch } from 'react';

type StateReducerAction<S> = {
  type: string;
  payload?: any;
};

type StateReducerOptions = {
  debugName?: string;
};

const stateReducer = <S extends Record<string, any> = {}>(
  initialState: S,
  reducers: Record<string, (state: S, payload?: any) => S>,
  options?: StateReducerOptions,
) => {
  const reducer: Reducer<S, StateReducerAction<S>> = (state, action) => {
    const handler = reducers[action.type];
    if (handler) {
      return handler(state, action.payload);
    }
    return state;
  };

  return useReducer(reducer, initialState);
};

export default stateReducer;
