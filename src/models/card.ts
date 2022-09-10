import { model, Schema } from 'mongoose';

interface ICard {
  name: String;
  link: String;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: [true, 'Обязательное поле.'],
    minlength: [
      2,
      'Минимальное количество символов 2, текущее количество {VALUE}.',
    ],
    maxlength: [
      30,
      'Максимальное количество символов 30, текущее количество {VALUE}.',
    ],
  },
  link: {
    type: String,
    required: [true, 'Обязательное поле.'],
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
    default: Date.now(),
  },
});

export default model<ICard>('card', cardSchema);
