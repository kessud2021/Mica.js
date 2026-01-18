import { Fragment } from 'react';
import type { ReactNode } from 'react';

const createFragment = (children: ReactNode): ReactNode => {
  return { $$typeof: Symbol.for('react.element'), type: Fragment, props: { children } };
};

export default createFragment;
