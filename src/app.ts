import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';

import { PORT, DATABASE_URL } from './constants/server';
import { requestLogger, errorLogger } from './middlewares/logger';

import auth from './middlewares/auth';
import errorsHandler from './middlewares/errorsHandler';

import { login, register } from './controllers/auth';
import {
  loginValidateRequest,
  registerValidateRequest,
} from './validators/auth';

import userRouter from './routes/users';
import cardRouter from './routes/cards';

const app = express();

mongoose.connect(DATABASE_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', registerValidateRequest, register);
app.post('/signin', loginValidateRequest, login);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT);
