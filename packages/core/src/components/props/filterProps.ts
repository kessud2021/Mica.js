type FilterPredicateFn = (key: string, value: any) => boolean;

type FilterOptions = {
  predicate?: FilterPredicateFn;
  whitelist?: string[];
  blacklist?: string[];
};

const filterProps = (
  props: Record<string, any>,
  options: FilterOptions,
): Record<string, any> => {
  const filtered: Record<string, any> = {};

  for (const key in props) {
    if (!Object.prototype.hasOwnProperty.call(props, key)) {
      continue;
    }

    const value = props[key];

    if (options.predicate && !options.predicate(key, value)) {
      continue;
    }

    if (options.whitelist && !options.whitelist.includes(key)) {
      continue;
    }

    if (options.blacklist && options.blacklist.includes(key)) {
      continue;
    }

    filtered[key] = value;
  }

  return filtered;
};

export default filterProps;
