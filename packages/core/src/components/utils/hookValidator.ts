const hookValidator = {
  isInComponent: (stackDepth: number = 2): boolean => {
    if (typeof Error === 'undefined') return false;
    const stack = new Error().stack;
    return stack ? stack.includes('render') || stack.includes('hook') : false;
  },

  validateDependencies: (deps: any[]): boolean => {
    if (!Array.isArray(deps)) return false;
    return deps.every(dep => {
      return (
        typeof dep === 'number' ||
        typeof dep === 'string' ||
        typeof dep === 'boolean' ||
        typeof dep === 'object' ||
        typeof dep === 'function'
      );
    });
  },

  checkMissingDependencies: (
    currentDeps: any[],
    previousDeps: any[],
  ): { missing: any[]; extra: any[] } => {
    const missing: any[] = [];
    const extra: any[] = [];

    for (const dep of currentDeps) {
      if (!previousDeps.includes(dep)) {
        missing.push(dep);
      }
    }

    for (const dep of previousDeps) {
      if (!currentDeps.includes(dep)) {
        extra.push(dep);
      }
    }

    return { missing, extra };
  },
};

export default hookValidator;
