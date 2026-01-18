/**
 * Calculates the diff between store states
 * @param store - The store object
 * @returns Object with diff method
 */
export default function diffStore<T extends Record<string, any>>(store: any) {
  let prevState = store.getState?.();

  return {
    diff(): Record<string, { from: any; to: any }> {
      const currentState = store.getState?.();
      const diff: Record<string, { from: any; to: any }> = {};

      for (const key in currentState) {
        if (currentState[key] !== prevState[key]) {
          diff[key] = { from: prevState[key], to: currentState[key] };
        }
      }

      prevState = currentState;
      return diff;
    },

    hasChanged(): boolean {
      const currentState = store.getState?.();
      return JSON.stringify(currentState) !== JSON.stringify(prevState);
    },
  };
}
