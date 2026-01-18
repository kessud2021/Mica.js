/**
 * Creates a global store with state management
 * @param initialState - The initial store state
 * @returns Store object with get, set, and subscribe methods
 */
export default function createStore<T extends Record<string, any>>(initialState: T) {
  let state = { ...initialState };
  const subscribers = new Set<(newState: T) => void>();
  const middlewares: ((state: T, action: any) => void)[] = [];

  return {
    getState(): T {
      return { ...state };
    },

    setState(newState: Partial<T> | ((prev: T) => Partial<T>)): void {
      const updates =
        typeof newState === 'function' ? newState(state) : newState;

      state = { ...state, ...updates };
      middlewares.forEach((mw) => mw(state, { type: 'setState', payload: updates }));
      subscribers.forEach((cb) => cb({ ...state }));
    },

    getState<K extends keyof T>(key: K): T[K] {
      return state[key];
    },

    setState<K extends keyof T>(key: K, value: T[K] | ((prev: T[K]) => T[K])): void {
      const newValue = typeof value === 'function' ? (value as any)(state[key]) : value;
      if (newValue !== state[key]) {
        state = { ...state, [key]: newValue };
        subscribers.forEach((cb) => cb({ ...state }));
      }
    },

    subscribe(callback: (state: T) => void): () => void {
      subscribers.add(callback);
      callback({ ...state });
      return () => subscribers.delete(callback);
    },

    reset(): void {
      state = { ...initialState };
      subscribers.forEach((cb) => cb({ ...state }));
    },

    use(middleware: (state: T, action: any) => void): void {
      middlewares.push(middleware);
    },
  };
}
