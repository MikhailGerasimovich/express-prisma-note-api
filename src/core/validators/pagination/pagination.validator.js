import Joi from 'joi';

export function validatePagination(query) {
  const schema = Joi.object({
    page: Joi.number().min(1),
    size: Joi.number().min(1).max(255),
  });

  const validated = schema.validate(query, { allowUnknown: true });
  if (validated.error) {
    throw new BadRequestException(validated.error.message);
  }

  return validated.value;
}
