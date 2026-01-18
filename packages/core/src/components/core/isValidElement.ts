import { isValidElement as reactIsValidElement } from 'react';
import type { ReactElement } from 'react';

const isValidElement = (object: any): object is ReactElement => {
  return reactIsValidElement(object);
};

export default isValidElement;
