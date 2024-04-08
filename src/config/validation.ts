import * as Joi from 'joi';

export const validationSchema = Joi.object({
  SERVER_PORT: Joi.number().greater(0).required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().greater(0).required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
});
