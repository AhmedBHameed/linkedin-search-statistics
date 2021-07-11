import {ErrorResponse} from './errorResponse';
import {VALIDATION_ERROR} from './validationError';

export const hasValidationError = (error): ErrorResponse | undefined => {
  if (error.name === 'ValidationError') {
    return VALIDATION_ERROR(error);
  }
  return;
};
