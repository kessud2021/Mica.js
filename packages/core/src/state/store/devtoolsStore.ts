/**
 * Adds devtools support to a store
 * @param store - The store object
 * @param name - Store name for devtools
 * @returns Store with devtools
 */
export default function devtoolsStore<T extends Record<string, any>>(
  store: any,
  name = 'Store'
) {
  const history: any[] = [];

  return {
    ...store,

    getHistory() {
      return [...history];
    },

    getTimeTravelState(index: number): T {
      return history[index]?.state || store.getState?.();
    },

    subscribe(callback: (state: T) => void): () => void {
      return store.subscribe?.((state: T) => {
        history.push({ state, timestamp: Date.now() });
        if (history.length > 50) {
          history.shift();
        }
        callback(state);
      });
    },
  };
}
