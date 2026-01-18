type PropValidator = (props: Record<string, any>) => { valid: boolean; errors: string[] };

const validateProps = (
  props: Record<string, any>,
  schema: Record<string, (value: any) => boolean>,
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      const validator = schema[key];
      const value = props[key];

      if (!validator(value)) {
        errors.push(`Invalid prop '${key}': ${value}`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
};

export default validateProps;
