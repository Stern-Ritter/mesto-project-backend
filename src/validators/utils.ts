import { ErrorReport } from 'joi';
import { isObjectIdOrHexString } from 'mongoose';
import BadRequestError from '../errors/bad-request-error';

const validateId = (errorText: string) => <V = any>(value: V): V | ErrorReport => {
  if (!isObjectIdOrHexString(value)) {
    throw new BadRequestError(errorText);
  }
  return value;
};

export { validateId };
