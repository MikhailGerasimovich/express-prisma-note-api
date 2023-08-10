import Joi from 'joi';
import { BadRequestException } from '../../../common/exceptions/bad-request.exception.js';

export function validateNoteFilter(noteData) {
  const schema = Joi.object({
    title: Joi.string().max(255),
    description: Joi.string().max(255),
    location: Joi.string().tag('default', 'always on top'),
    tags: Joi.array().items(Joi.string()).min(1),
    color: Joi.string(),
  });

  const validated = schema.validate(noteData);
  if (validated.error) {
    throw new BadRequestException(validated.error.message);
  }

  return validated.value;
}
