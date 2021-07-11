import Joi from 'joi';

interface StringErrorMessages {
  required?: string;
}

/**
 * Joi required string validation function.
 * To customize error messages, pass an object of type EmailErrorMessages; otherwise, default messages activated.
 * {
 *    required?: string;
 * }
 *
 * @param conf type of EmailErrorMessages
 * @returns
 */
export const requiredString = (conf?: StringErrorMessages) =>
  Joi.string()
    .required()
    .messages({
      'string.empty': conf?.required || 'validationError.required',
      'string.base': conf?.required || 'validationError.required',
      'any.required': conf?.required || 'validationError.required',
    });
