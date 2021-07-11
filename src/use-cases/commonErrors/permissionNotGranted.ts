import {ErrorResponse} from './errorResponse';

export const PERMISSION_DENIED = new ErrorResponse({
  errorCode: 'PERMISSION_DENIED',
  message: "Your don't have permission!",
  statusCode: 403,
});
