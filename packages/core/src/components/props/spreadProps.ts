type SpreadPropsOptions = {
  exclude?: string[];
  include?: string[];
};

const spreadProps = (
  target: Record<string, any>,
  source: Record<string, any>,
  options?: SpreadPropsOptions,
): Record<string, any> => {
  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (options?.exclude?.includes(key)) {
        continue;
      }

      if (options?.include && !options.include.includes(key)) {
        continue;
      }

      result[key] = source[key];
    }
  }

  return result;
};

export default spreadProps;
