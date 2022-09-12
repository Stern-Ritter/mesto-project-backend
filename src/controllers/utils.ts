import { NextFunction } from 'express';
import { SchemaError } from '../types';
import BadRequestError from '../errors/bad-request-error';
import ConflictingRequestError from '../errors/conflicting-request-error';

const handleSchemaErrors = (err: SchemaError, next: NextFunction) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    next(new BadRequestError(err.message));
  } else if (err.code === 11000) {
    next(
      new ConflictingRequestError('Пользователь с таким email уже существует.'),
    );
  } else {
    next(err);
  }
};

export { handleSchemaErrors };
