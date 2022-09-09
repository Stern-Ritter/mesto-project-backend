import { celebrate, Joi, Segments } from 'celebrate';

export const getUserByIdValidateRequest = celebrate({
  [Segments.PARAMS]: Joi.object()
    .keys({
      userId: Joi.string().alphanum().required(),
    })
    .unknown(true),
});

export const createUserValidateRequest = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(200),
      avatar: Joi.string().uri().required(),
    })
    .unknown(true),
});

export const updateUserValidateRequest = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(200),
    })
    .unknown(true),
});

export const updateUserAvatarValidateRequest = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      avatar: Joi.string().uri().required(),
    })
    .unknown(true),
});
