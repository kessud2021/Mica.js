import type { ReactNode } from 'react';

type ServerComponentProps = Record<string, any>;

type ServerComponent<P = ServerComponentProps> = (props: P) => Promise<ReactNode> | ReactNode;

const serverComponent = <P extends ServerComponentProps = {}>(
  component: ServerComponent<P>,
): ServerComponent<P> => {
  return component;
};

export default serverComponent;

export type { ServerComponent, ServerComponentProps };
