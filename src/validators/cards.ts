import { celebrate, Joi, Segments } from 'celebrate';

export const createCardValidateRequest = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    })
    .unknown(true),
});

export const deleteCardByIdValidateRequest = celebrate({
  [Segments.PARAMS]: Joi.object()
    .keys({
      cardId: Joi.string().alphanum().required(),
    })
    .unknown(true),
});

export const likeCardValidateRequest = celebrate({
  [Segments.PARAMS]: Joi.object()
    .keys({
      cardId: Joi.string().alphanum().required(),
    })
    .unknown(true),
});

export const dislikeCardValidateRequest = celebrate({
  [Segments.PARAMS]: Joi.object()
    .keys({
      cardId: Joi.string().alphanum().required(),
    })
    .unknown(true),
});
