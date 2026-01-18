/**
 * Creates a computed value - a memoized value based on dependencies
 * @param dependencies - Array of dependencies
 * @param compute - Function to compute the value
 * @returns Computed value with get and refresh methods
 */
export default function computedValue<T>(
  dependencies: any[],
  compute: (...args: any[]) => T
) {
  let result: T;
  let lastDeps: any[] = [];
  let dirty = true;

  const isDependencyChanged = () => {
    if (lastDeps.length !== dependencies.length) return true;
    return dependencies.some((dep, i) => {
      const depValue = dep.get?.() || dep.getValue?.();
      return depValue !== lastDeps[i];
    });
  };

  const recompute = () => {
    lastDeps = dependencies.map((dep: any) => dep.get?.() || dep.getValue?.());
    result = compute(...lastDeps);
    dirty = false;
  };

  return {
    get(): T {
      if (dirty || isDependencyChanged()) {
        recompute();
      }
      return result;
    },

    refresh(): T {
      dirty = true;
      return this.get();
    },

    isDirty(): boolean {
      return dirty || isDependencyChanged();
    },
  };
}
