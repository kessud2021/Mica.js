import type { ComponentType } from 'react';

type Composer<P> = (Component: ComponentType<P>) => ComponentType<P>;

const compose = <P extends Record<string, any> = {}>(
  ...composers: Composer<P>[]
): Composer<P> => {
  return (Component: ComponentType<P>) => {
    return composers.reduce((acc, composer) => composer(acc), Component);
  };
};

export default compose;
