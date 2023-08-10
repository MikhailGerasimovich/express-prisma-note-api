import Joi from 'joi';
import { BadRequestException } from '../../../common/exceptions/bad-request.exception.js';

export function validateTagFilter(tagData) {
  const schema = Joi.object({
    title: Joi.string().max(255),
  });

  const validated = schema.validate(tagData);
  if (validated.error) {
    throw new BadRequestException(validated.error.message);
  }

  return validated.value;
}
