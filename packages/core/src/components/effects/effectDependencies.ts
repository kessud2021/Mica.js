import type { DependencyList } from 'react';

type DependencyAnalysis = {
  hasDependencies: boolean;
  isEmpty: boolean;
  count: number;
  changed: boolean;
};

const effectDependencies = (current: DependencyList, previous?: DependencyList): DependencyAnalysis => {
  const hasDependencies = Array.isArray(current);
  const isEmpty = hasDependencies && current.length === 0;
  const count = hasDependencies ? current.length : 0;

  let changed = true;
  if (previous && hasDependencies && Array.isArray(previous) && previous.length === count) {
    changed = !current.every((dep, i) => Object.is(dep, previous[i]));
  }

  return { hasDependencies, isEmpty, count, changed };
};

export default effectDependencies;
