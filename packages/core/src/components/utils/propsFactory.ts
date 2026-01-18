type PropsFactoryOptions<T> = {
  validate?: (props: T) => boolean;
  transform?: (props: T) => T;
  merge?: (defaults: Partial<T>, provided: T) => T;
};

const propsFactory = <T extends Record<string, any> = {}>(
  defaults: Partial<T>,
  options?: PropsFactoryOptions<T>,
) => {
  return (provided: T): T => {
    let merged = { ...defaults, ...provided } as T;

    if (options?.transform) {
      merged = options.transform(merged);
    }

    if (options?.validate && !options.validate(merged)) {
      throw new Error('Invalid props');
    }

    if (options?.merge) {
      merged = options.merge(defaults, provided);
    }

    return merged;
  };
};

export default propsFactory;
