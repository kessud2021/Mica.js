import { renderToString } from 'react-dom/server';
import type { ReactElement } from 'react';

type ServerRenderOptions = {
  encoding?: BufferEncoding;
};

const serverRender = (
  element: ReactElement,
  options?: ServerRenderOptions,
): Promise<string> => {
  return Promise.resolve(renderToString(element));
};

export default serverRender;
