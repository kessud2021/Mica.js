type PropType = 'string' | 'number' | 'boolean' | 'array' | 'object' | 'function' | 'node';

type PropTypeValidator = (value: any) => boolean;

type PropsTypeSchema = Record<string, PropType | PropTypeValidator>;

const propsTypes = {
  string: (value: any): boolean => typeof value === 'string',
  number: (value: any): boolean => typeof value === 'number',
  boolean: (value: any): boolean => typeof value === 'boolean',
  array: (value: any): boolean => Array.isArray(value),
  object: (value: any): boolean => typeof value === 'object' && value !== null && !Array.isArray(value),
  function: (value: any): boolean => typeof value === 'function',
  node: (value: any): boolean => value !== null && (typeof value === 'number' || typeof value === 'string'),
};

export default propsTypes;

export type { PropType, PropTypeValidator, PropsTypeSchema };
