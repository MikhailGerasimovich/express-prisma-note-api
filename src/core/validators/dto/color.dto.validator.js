import Joi from 'joi';

export function validateCreateColorDto(colorData) {
  const schema = Joi.object({
    title: Joi.string().max(255).required(),
  });

  const validated = schema.validate(colorData);
  if (validated.error) {
    throw new BadRequestException(validated.error.message);
  }

  return validated.value;
}

export function validateUpdateColorDto(colorData) {
  const schema = Joi.object({
    title: Joi.string().max(255),
  });

  const validated = schema.validate(colorData);
  if (validated.error) {
    throw new BadRequestException(validated.error.message);
  }

  return validated.value;
}
