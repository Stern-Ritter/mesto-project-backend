import { Request, Response, NextFunction } from 'express';
import { SessionRequest, TUserSession } from '../types';
import Card from '../models/card';
import NotFoundError from '../errors/not-found-error';
import ForbiddenError from '../errors/forbidden-error';
import { handleSchemaErrors } from './utils';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

export const createCard = (
  expressRequest: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = expressRequest as SessionRequest;
  const { _id } = req.user as TUserSession;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => card.populate('owner'))
    .then((card) => res.send({ data: card }))
    .catch((err) => handleSchemaErrors(err, next));
};

export const deleteCardById = (
  expressRequest: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = expressRequest as SessionRequest;
  const { _id } = req.user as TUserSession;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } else if (card.owner.valueOf() === _id) {
        Card.findByIdAndRemove(cardId)
          .populate('owner')
          .then((deletedCard) => {
            res.send({ data: deletedCard });
          })
          .catch((err) => handleSchemaErrors(err, next));
      } else {
        throw new ForbiddenError(
          'Невозможно удалить карточку другого пользователя.',
        );
      }
    })
    .catch((err) => handleSchemaErrors(err, next));
};

export const likeCard = (
  expressRequest: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = expressRequest as SessionRequest;
  const { _id } = req.user as TUserSession;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true, runValidators: true },
  )
    .populate('owner')
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
    })
    .catch((err) => handleSchemaErrors(err, next));
};

export const dislikeCard = (
  expressRequest: Request,
  res: Response,
  next: NextFunction,
) => {
  const req = expressRequest as SessionRequest;
  const { _id } = req.user as TUserSession;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true, runValidators: true },
  )
    .populate('owner')
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
    })
    .catch((err) => handleSchemaErrors(err, next));
};
