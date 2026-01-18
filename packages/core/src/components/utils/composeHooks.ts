type Hook<R = any> = () => R;

const composeHooks = <T extends Hook[] = Hook[]>(...hooks: T): (() => any[]) => {
  return () => {
    return hooks.map(hook => hook());
  };
};

export default composeHooks;
