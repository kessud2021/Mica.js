import { createRoot } from 'react-dom/client';
import type { ReactNode } from 'react';

type RenderResult = {
  unmount: () => void;
};

const render = (element: ReactNode, container: HTMLElement | null): RenderResult => {
  if (!container) {
    throw new Error('Container element not found');
  }

  const root = createRoot(container);
  root.render(element as any);

  return {
    unmount: () => {
      root.unmount();
    },
  };
};

export default render;
