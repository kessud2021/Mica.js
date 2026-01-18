type HookFunction<T extends any[] = any[], R = any> = (...args: T) => R;

const createHook = <T extends any[] = any[], R = any>(
  hookFn: HookFunction<T, R>,
  name?: string,
): HookFunction<T, R> => {
  const fn = hookFn as any;
  if (name) {
    fn.displayName = name;
  }
  return fn;
};

export default createHook;
