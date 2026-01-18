type DefaultPropsConfig<T extends Record<string, any>> = {
  [K in keyof T]: T[K];
};

const defaultProps = <T extends Record<string, any> = {}>(
  props: T,
  defaults: Partial<T>,
): T => {
  const result = { ...defaults, ...props } as T;
  return result;
};

export default defaultProps;
