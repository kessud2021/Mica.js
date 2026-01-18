import type { ComponentType } from 'react';

type PropTypeSchema = Record<string, (value: any) => boolean>;

const propTypes = <P extends Record<string, any> = {}>(
  Component: ComponentType<P>,
  schema: PropTypeSchema,
): ComponentType<P> => {
  const component = Component as any;
  component.propTypes = schema;
  return Component;
};

export default propTypes;
