import { Fragment } from 'react';
import type { ReactNode } from 'react';

const fragmentRender = (...children: ReactNode[]): ReactNode => {
  return { $$typeof: Symbol.for('react.element'), type: Fragment, props: { children } };
};

export default fragmentRender;
