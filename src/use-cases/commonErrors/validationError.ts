import {ValidationError} from 'joi';

import {ErrorResponse} from './errorResponse';

/**
 * Error return as follow:
 *
 * errorCode: 'ValidationError',
 * message: validationResult.error?.message || '',
 * statusCode: 400,
 */
export const VALIDATION_ERROR = (validationResult: ValidationError): ErrorResponse =>
  new ErrorResponse({
    errorCode: 'VALIDATION_ERROR',
    message: validationResult.message || 'Something went wrong with validation!',
    statusCode: 422,
  });
