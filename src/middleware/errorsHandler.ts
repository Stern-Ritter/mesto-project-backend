import { Request, Response, NextFunction } from 'express';

const DEFAULT_ERROR_STATUS_CODE = 500;

const errorsHandler = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = DEFAULT_ERROR_STATUS_CODE, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === DEFAULT_ERROR_STATUS_CODE
        ? 'На сервере произошла ошибка.'
        : message,
  });
};

export default errorsHandler;
