/**
 * Creates a derived atom - a read-only atom that computes from other atoms
 * @param dependencies - Atoms to depend on
 * @param compute - Function to compute the derived value
 * @returns Derived atom with get and subscribe methods
 */
export default function derivedAtom<T>(
  dependencies: any[],
  compute: (...args: any[]) => T
) {
  let cached: T;
  const subscribers = new Set<(value: T) => void>();

  const recompute = () => {
    const values = dependencies.map((dep: any) => dep.get?.() || dep.getValue?.());
    cached = compute(...values);
  };

  recompute();

  dependencies.forEach((dep: any) => {
    dep.subscribe?.(() => {
      const oldValue = cached;
      recompute();
      if (cached !== oldValue) {
        subscribers.forEach((cb) => cb(cached));
      }
    });
  });

  return {
    get(): T {
      return cached;
    },

    subscribe(callback: (value: T) => void): () => void {
      subscribers.add(callback);
      callback(cached);
      return () => {
        subscribers.delete(callback);
      };
    },

    isDerived(): boolean {
      return true;
    },
  };
}
