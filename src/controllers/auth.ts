import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { handleSchemaErrors } from './utils';
import {
  PASSWORD_HASH_ROUNDS_NUMBER,
  SECRET_KEY,
  JWT_EXPIRES_IN,
} from '../constants/auth';

export const register = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, PASSWORD_HASH_ROUNDS_NUMBER)
    .then((passwordHash) => User.create({
      name,
      about,
      avatar,
      email,
      password: passwordHash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => handleSchemaErrors(err, next));
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: JWT_EXPIRES_IN,
      });
      res.send({ token });
    })
    .catch((err) => handleSchemaErrors(err, next));
};
