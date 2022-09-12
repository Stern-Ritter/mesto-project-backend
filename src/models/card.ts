import { model, Schema } from 'mongoose';

import { URL_REGEXP } from '../constants/regexp';

interface ICard {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: [true, 'Обязательное поле.'],
    minlength: [2, 'Минимальное количество символов 2.'],
    maxlength: [30, 'Максимальное количество символов 30.'],
  },
  link: {
    type: String,
    required: [true, 'Обязательное поле.'],
    validate: {
      validator: (value: string) => URL_REGEXP.test(value),
      message: 'Некорректный формат ссылки на фотографию в карточке.',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Обязательное поле.'],
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<ICard>('card', cardSchema);
