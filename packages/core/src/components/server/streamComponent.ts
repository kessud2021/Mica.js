import { Readable } from 'stream';
import type { ReactElement } from 'react';

type StreamOptions = {
  onError?: (error: Error) => void;
  onComplete?: () => void;
};

const streamComponent = (
  element: ReactElement,
  options?: StreamOptions,
): Promise<Readable> => {
  return Promise.resolve(Readable.from([]));
};

export default streamComponent;

export type { StreamOptions };
