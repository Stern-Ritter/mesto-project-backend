import { Request, Response, NextFunction } from 'express';
import { SessionRequest, TUserSession } from '../types';
import User from '../models/user';
import NotFoundError from '../errors/not-found-error';
import { handleSchemaErrors } from './utils';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
    })
    .catch((err) => handleSchemaErrors(err, next));
};

export const getCurrentUser = (
  expressRequest: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = expressRequest as SessionRequest;
  const { _id } = req.user as TUserSession;

  User.findById(_id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
    })
    .catch((err) => handleSchemaErrors(err, next));
};

export const updateUser = (
  expressRequest: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = expressRequest as SessionRequest;
  const { _id } = req.user as TUserSession;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
    })
    .catch((err) => handleSchemaErrors(err, next));
};

export const updateUserAvatar = (
  expressRequest: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = expressRequest as SessionRequest;
  const { _id } = req.user as TUserSession;
  const { avatar } = req.body;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
    })
    .catch((err) => handleSchemaErrors(err, next));
};
