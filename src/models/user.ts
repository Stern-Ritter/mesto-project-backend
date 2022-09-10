import { model, Schema } from 'mongoose';

interface IUser {
  name: String;
  about: String;
  avatar: String;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Обязательное поле.'],
    minlength: [2, 'Минимальное количество символов 2.'],
    maxlength: [30, 'Максимальное количество символов 30.'],
  },
  about: {
    type: String,
    required: [true, 'Обязательное поле.'],
    minlength: [2, 'Минимальное количество символов 2.'],
    maxlength: [200, 'Максимальное количество символов 200.'],
  },
  avatar: {
    type: String,
    required: [true, 'Обязательное поле.'],
  },
});

export default model<IUser>('user', userSchema);
