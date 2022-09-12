import { celebrate, Joi, Segments } from 'celebrate';

export const loginValidateRequest = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })
    .unknown(true),
});

export const registerValidateRequest = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().uri(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })
    .unknown(true),
});
