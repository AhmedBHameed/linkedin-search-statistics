import {ErrorResponse} from '../../use-cases/commonErrors';

export const INTERNAL_SERVER_ERROR = (error: Error): ErrorResponse =>
  new ErrorResponse({
    errorCode: 'INTERNAL_SERVER_ERROR',
    message: error.message || 'Something went wrong with validation!',
    statusCode: 422,
  });
