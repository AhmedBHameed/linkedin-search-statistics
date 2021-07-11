import Joi from 'joi';

interface EmailErrorMessages {
  required?: string;
  invalidEmail?: string;
}

/**
 * Joi email validation function.
 * To customize error messages, pass an object of type EmailErrorMessages; otherwise, default messages activated.
 * {
 *    required?: string;
 *    invalidEmail?: string;
 *    emptyEmail?: string;
 * }
 *
 * @param conf type of EmailErrorMessages
 * @returns
 */
export const requiredEmail = (conf?: EmailErrorMessages) =>
  Joi.string()
    .email({tlds: {allow: false}}) // Disable top level domain of email to prevent error validation.
    .required()
    .messages({
      'string.email': conf?.invalidEmail || 'validationError.invalidEmail',
      'string.empty': conf?.required || 'validationError.required',
    });
