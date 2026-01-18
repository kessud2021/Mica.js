type StoreListener<T> = (state: T) => void;

type Store<T> = {
  getState: () => T;
  setState: (newState: Partial<T> | ((state: T) => T)) => void;
  subscribe: (listener: StoreListener<T>) => () => void;
  reset: () => void;
};

const createStore = <T extends Record<string, any> = {}>(initialState: T): Store<T> => {
  let state = initialState;
  const listeners = new Set<StoreListener<T>>();

  return {
    getState: () => state,
    setState: (newState) => {
      const nextState = typeof newState === 'function' ? newState(state) : { ...state, ...newState };
      if (nextState !== state) {
        state = nextState;
        listeners.forEach(listener => listener(state));
      }
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    reset: () => {
      state = initialState;
      listeners.forEach(listener => listener(state));
    },
  };
};

export default createStore;
