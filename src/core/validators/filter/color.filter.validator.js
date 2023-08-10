import Joi from 'joi';
import { BadRequestException } from '../../../common/exceptions/bad-request.exception.js';

export function validateColorFilter(colorData) {
  const schema = Joi.object({
    title: Joi.string().max(255),
  });

  const validated = schema.validate(colorData);
  if (validated.error) {
    throw new BadRequestException(validated.error.message);
  }

  return validated.value;
}
