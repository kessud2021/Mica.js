import { useState, useEffect } from 'react';

type Store<T> = {
  getState: () => T;
  subscribe: (listener: (state: T) => void) => () => void;
};

const useStore = <T, S = T>(store: Store<T>, selector?: (state: T) => S): S => {
  const [state, setState] = useState<S>(() => {
    const fullState = store.getState();
    return selector ? selector(fullState) : (fullState as unknown as S);
  });

  useEffect(() => {
    const unsubscribe = store.subscribe(fullState => {
      const newState = selector ? selector(fullState) : (fullState as unknown as S);
      setState(newState);
    });

    return unsubscribe;
  }, [store, selector]);

  return state;
};

export default useStore;
