import { NextFunction } from 'express';
import BadRequestError from '../errors/bad-request-error';

const handleSchemaErrors = (err: Error, next: NextFunction) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    next(new BadRequestError(err.message));
  } else {
    next(err);
  }
};

export { handleSchemaErrors };
