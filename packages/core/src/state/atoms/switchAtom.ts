/**
 * Switches between atoms based on a condition
 * @param condition - Atom or function that determines which atom to use
 * @param atomA - First atom option
 * @param atomB - Second atom option
 * @returns Switched atom
 */
export default function switchAtom<T>(
  condition: any | (() => boolean),
  atomA: any,
  atomB: any
) {
  const subscribers = new Set<(value: T) => void>();

  const getCondition = () => {
    if (typeof condition === 'function') {
      return condition();
    }
    return condition.get?.() || condition.getValue?.();
  };

  let isUsingA = getCondition();
  let currentAtom = isUsingA ? atomA : atomB;

  const updateSubscription = () => {
    const newCondition = getCondition();
    if (newCondition !== isUsingA) {
      isUsingA = newCondition;
      currentAtom = isUsingA ? atomA : atomB;
      subscribers.forEach((cb) => cb(currentAtom.get?.() || currentAtom.getValue?.()));
    }
  };

  if (typeof condition !== 'function' && condition.subscribe) {
    condition.subscribe(() => updateSubscription());
  }

  return {
    get(): T {
      updateSubscription();
      return currentAtom.get?.() || currentAtom.getValue?.();
    },

    subscribe(callback: (value: T) => void) {
      subscribers.add(callback);
      callback(this.get());
      return () => subscribers.delete(callback);
    },
  };
}
