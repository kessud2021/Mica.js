import type { ComponentType } from 'react';

type HookFunction = () => any;

type WithHooksOptions = {
  hooks: Record<string, HookFunction>;
};

const withHooks = <P extends Record<string, any> = {}>(
  Component: ComponentType<P>,
  options: WithHooksOptions,
): ComponentType<P> => {
  return (props: P) => {
    const hookResults: Record<string, any> = {};

    for (const key in options.hooks) {
      if (Object.prototype.hasOwnProperty.call(options.hooks, key)) {
        hookResults[key] = options.hooks[key]();
      }
    }

    return Component({ ...props, ...hookResults });
  };
};

export default withHooks;
