import {ErrorResponse} from '../../use-cases/commonErrors';

export const MISSING_TOKENS = new ErrorResponse({
  message: "We can't find any token!",
  errorCode: 'MISSING_TOKENS',
  statusCode: 422,
});
