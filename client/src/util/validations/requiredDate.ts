import DateExtension from '@joi/date';
import JoiBase from 'joi';

const Joi = JoiBase.extend(DateExtension);

interface StringErrorMessages {
  required?: string;
  invalidDate?: string;
  invalidMaxDate?: string;
}

/**
 * Joi required string validation function.
 * To customize error messages, pass an object of type EmailErrorMessages; otherwise, default messages activated.
 * {
 *    required?: string;
 * }
 *+
 * @param conf type of EmailErrorMessages
 * @returns
 */
export const requiredDate = (dateFormat?: string, conf?: StringErrorMessages) =>
  Joi.date()
    .format(dateFormat)
    .max('now')
    .required()
    .messages({
      'date.base': conf?.invalidDate || 'validationError.invalidDate',
      'date.max': conf?.invalidMaxDate || 'validationError.invalidMaxDate',
      'string.empty': conf?.required || 'Field required',
      'any.required': conf?.required || 'Field required',
      'date.format': conf?.required || 'validationError.invalidDate',
    });
