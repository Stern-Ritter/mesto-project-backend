import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SessionRequest } from '../types';
import UnauthorizedError from '../errors/unauthorized-error';
import { SECRET_KEY } from '../constants/auth';

const extractBearerToken = (token: string) => token.replace('Bearer ', '');

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = extractBearerToken(authorization);
    let payload;
    try {
      payload = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      throw new UnauthorizedError('Необходима авторизация.');
    }
    req.user = payload;
    next();
  } else {
    throw new UnauthorizedError('Необходима авторизация.');
  }
};
