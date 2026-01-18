const mergeProps = (...propsList: Record<string, any>[]): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const props of propsList) {
    if (props && typeof props === 'object') {
      for (const key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
          const value = props[key];

          if (key === 'className' || key === 'class') {
            result[key] = [result[key], value].filter(Boolean).join(' ');
          } else if (key === 'style') {
            result[key] = { ...result[key], ...value };
          } else if (typeof value === 'function' && key.startsWith('on')) {
            const existing = result[key];
            result[key] = existing
              ? (...args: any[]) => {
                  existing(...args);
                  value(...args);
                }
              : value;
          } else {
            result[key] = value;
          }
        }
      }
    }
  }

  return result;
};

export default mergeProps;
