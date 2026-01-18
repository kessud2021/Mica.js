type NormalizationOptions = {
  camelCase?: boolean;
  removeEmpty?: boolean;
};

const normalizeProps = (
  props: Record<string, any>,
  options?: NormalizationOptions,
): Record<string, any> => {
  const normalized: Record<string, any> = {};

  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const value = props[key];

      if (options?.removeEmpty && (value === '' || value === null || value === undefined)) {
        continue;
      }

      let normalizedKey = key;
      if (options?.camelCase) {
        normalizedKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      }

      normalized[normalizedKey] = value;
    }
  }

  return normalized;
};

export default normalizeProps;
