import Joi from 'joi';

export function validateQuery(query) {
  const schema = Joi.object({
    page: Joi.number().min(1),
    size: Joi.number().min(1).max(255),
  });

  const validated = schema.validate(query);
  if (validated.error) {
    throw new BadRequestException(validated.error.message);
  }

  return validated.value;
}
