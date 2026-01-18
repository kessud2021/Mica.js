import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

const portalRender = (element: ReactNode, container: HTMLElement | DocumentFragment): ReactNode => {
  return createPortal(element, container);
};

export default portalRender;
