type ExtractPropsOptions = {
  deep?: boolean;
};

const extractProps = (
  props: Record<string, any>,
  keys: string[],
  options?: ExtractPropsOptions,
): Record<string, any> => {
  const extracted: Record<string, any> = {};

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      extracted[key] = props[key];
    }
  }

  return extracted;
};

export default extractProps;
