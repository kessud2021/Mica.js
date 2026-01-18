/**
 * Retries atom updates on failure
 * @param atom - The atom
 * @param maxRetries - Maximum number of retries
 * @param delayMs - Delay between retries
 * @returns Atom with retry logic
 */
export default function retryAtom<T>(atom: any, maxRetries = 3, delayMs = 1000) {
  let currentValue = atom.get?.() || atom.getValue?.();
  let retryCount = 0;
  const subscribers = new Set<(value: T | Error) => void>();

  const retry = async (value: T | Error) => {
    if (value instanceof Error && retryCount < maxRetries) {
      retryCount++;
      return new Promise((resolve) => {
        setTimeout(() => {
          atom.subscribe?.((newValue: T) => {
            currentValue = newValue;
            retryCount = 0;
            subscribers.forEach((cb) => cb(newValue));
            resolve(newValue);
          });
        }, delayMs);
      });
    } else if (!(value instanceof Error)) {
      currentValue = value;
      retryCount = 0;
    }

    subscribers.forEach((cb) => cb(value));
  };

  atom.subscribe?.((value: T) => {
    retry(value);
  });

  return {
    get(): T {
      return currentValue;
    },

    getRetryCount(): number {
      return retryCount;
    },

    subscribe(callback: (value: T | Error) => void) {
      subscribers.add(callback);
      callback(currentValue);
      return () => subscribers.delete(callback);
    },
  };
}
