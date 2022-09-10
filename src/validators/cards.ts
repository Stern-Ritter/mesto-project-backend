import { celebrate, Joi, Segments } from 'celebrate';
import { validateId } from './utils';

const validateCardId = validateId('Передан некорректный _id карточки.');

export const createCardValidateRequest = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    })
    .unknown(true),
});

export const validateCardIdParam = celebrate({
  [Segments.PARAMS]: Joi.object()
    .keys({
      cardId: Joi.string()
        .custom(validateCardId, 'card id validation')
        .required(),
    })
    .unknown(true),
});
