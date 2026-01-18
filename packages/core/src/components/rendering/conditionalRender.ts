import type { ReactNode } from 'react';

const conditionalRender = <T,>(
  condition: boolean | T | null | undefined,
  renderTrue: ReactNode | ((value: T) => ReactNode),
  renderFalse?: ReactNode | (() => ReactNode),
): ReactNode => {
  if (condition) {
    if (typeof renderTrue === 'function') {
      return (renderTrue as any)(condition);
    }
    return renderTrue;
  }

  if (renderFalse) {
    if (typeof renderFalse === 'function') {
      return renderFalse();
    }
    return renderFalse;
  }

  return null;
};

export default conditionalRender;
