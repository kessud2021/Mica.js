type RestPropsOptions = {
  exclude?: string[];
};

const restProps = (
  props: Record<string, any>,
  knownKeys: string[],
  options?: RestPropsOptions,
): Record<string, any> => {
  const rest: Record<string, any> = {};

  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      if (knownKeys.includes(key)) {
        continue;
      }

      if (options?.exclude?.includes(key)) {
        continue;
      }

      rest[key] = props[key];
    }
  }

  return rest;
};

export default restProps;
