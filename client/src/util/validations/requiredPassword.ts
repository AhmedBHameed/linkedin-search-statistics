import Joi from 'joi';

interface PasswordErrorMessages {
  required?: string;
  invalidPassword?: string;
}

/**
 * Joi password validation function.
 * To customize error messages, pass an object of type PasswordErrorMessages; otherwise, default messages activated.
 * {
 *    required?: string;
 *    invalidPassword?: string;
 * }
 *
 * @param conf type of PasswordErrorMessages
 * @returns
 */
export const requiredPassword = (conf?: PasswordErrorMessages) =>
  Joi.string()
    .pattern(
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,255}$/
    )
    .required()
    .messages({
      'string.pattern.base':
        conf?.invalidPassword || 'validationError.invalidPassword',
      'any.required': conf?.required || 'validationError.required',
      'string.empty': conf?.required || 'validationError.required',
    });
