import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';

import userRouter from './routes/users';
import cardRouter from './routes/cards';
import errorsHandler from './middleware/errorsHandler';

const PORT = 3000;
const DATABASE_URL = 'mongodb://localhost:27017/mestodb';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DATABASE_URL);

app.use((req, res, next) => {
  // @ts-ignore
  req.user = {
    _id: '631a5d90c1f5220b1db109ca',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT);
