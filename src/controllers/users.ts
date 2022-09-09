import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/not-found-err';
import User from '../models/user';

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
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  // @ts-ignore
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
    })
    .catch(next);
};

export const updateUserAvatar = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  // @ts-ignore
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
    })
    .catch(next);
};
