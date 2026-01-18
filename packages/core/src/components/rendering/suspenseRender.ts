import { Suspense } from 'react';
import type { ReactNode } from 'react';

type SuspenseProps = {
  fallback: ReactNode;
  children: ReactNode;
  onPending?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

const suspenseRender = (props: SuspenseProps): ReactNode => {
  return {
    $$typeof: Symbol.for('react.element'),
    type: Suspense,
    props: { fallback: props.fallback, children: props.children },
  };
};

export default suspenseRender;
