import {
  model, Schema, Model, Document,
} from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import UnauthorizedError from '../errors/unauthorized-error';

import { URL_REGEXP } from '../constants/regexp';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<Document<unknown, any, IUser>>;
}

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    minlength: [2, 'Минимальное количество символов 2.'],
    maxlength: [30, 'Максимальное количество символов 30.'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальное количество символов 2.'],
    maxlength: [200, 'Максимальное количество символов 200.'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (value: string) => URL_REGEXP.test(value),
      message: 'Некорректный формат ссылки на аватар.',
    },
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: [true, 'Обязательное поле.'],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Некорректный формат почты.',
    },
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле.'],
    select: false,
  },
});

userSchema.static(
  'findUserByCredentials',
  function findUserByCredentials(email: string, password: string) {
    return this.findOne({ email })
      .select('+password')
      .then((user) => {
        if (user) {
          return bcrypt
            .compare(password, user.password)
            .then((passwordMatched) => {
              if (passwordMatched) {
                return user;
              }
              return Promise.reject(
                new UnauthorizedError('Некорректные почта или пароль.'),
              );
            });
        }
        return Promise.reject(
          new UnauthorizedError('Некорректные почта или пароль.'),
        );
      });
  },
);

const User = model<IUser, UserModel>('user', userSchema);
User.createIndexes();

export default User;
