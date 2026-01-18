const validateHookRules = (hookName: string, deps?: any[]): void => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    if (!Array.isArray(deps)) {
      console.warn(
        `Hook '${hookName}' was called with invalid dependencies. Expected an array, got ${typeof deps}`,
      );
    }

    if (Array.isArray(deps)) {
      const hasDuplicates = new Set(deps).size !== deps.length;
      if (hasDuplicates) {
        console.warn(`Hook '${hookName}' has duplicate dependencies which may cause issues`);
      }
    }
  }
};

export default validateHookRules;
