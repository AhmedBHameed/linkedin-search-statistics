import {ErrorResponse} from '../../use-cases/commonErrors';

export const TOO_MANY_REQUESTS = new ErrorResponse({
  errorCode: 'TOO_MANY_REQUESTS',
  message: 'Too many requests! please try again later',
  statusCode: 429,
});
