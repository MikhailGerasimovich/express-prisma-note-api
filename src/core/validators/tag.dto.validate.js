import Joi from 'joi';

export function validateCreateTagDto(tagData) {
  const schema = Joi.object({
    title: Joi.string().max(255).required(),
  });

  const validated = schema.validate(tagData);
  if (validated.error) {
    throw new BadRequestException(validated.error.message);
  }

  return validated.value;
}

export function validateUpdateTagDto(tagData) {
  const schema = Joi.object({
    title: Joi.string().max(255),
  });

  const validated = schema.validate(tagData);
  if (validated.error) {
    throw new BadRequestException(validated.error.message);
  }

  return validated.value;
}
