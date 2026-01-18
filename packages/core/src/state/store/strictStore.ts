/**
 * Creates a strict store that validates all updates
 * @param store - The store object
 * @param validators - Validation functions per key
 * @returns Strict store
 */
export default function strictStore<T extends Record<string, any>>(
  store: any,
  validators?: { [K in keyof T]?: (value: T[K]) => boolean }
) {
  return {
    getState(): T {
      return store.getState?.();
    },

    setState(newState: Partial<T>): void {
      if (validators) {
        for (const key in newState) {
          const validator = validators[key as keyof T];
          if (validator && !validator(newState[key as keyof T])) {
            throw new Error(`Invalid value for key: ${String(key)}`);
          }
        }
      }
      store.setState?.(newState);
    },

    subscribe(callback: (state: T) => void): () => void {
      return store.subscribe?.(callback);
    },

    reset(): void {
      store.reset?.();
    },
  };
}
