import type { ReactNode } from 'react';

const renderIf = (condition: boolean | null | undefined): { then: (node: ReactNode) => ReactNode; else: (node: ReactNode) => ReactNode } => {
  return {
    then: (node: ReactNode) => (condition ? node : null),
    else: (node: ReactNode) => (!condition ? node : null),
  };
};

export default renderIf;
