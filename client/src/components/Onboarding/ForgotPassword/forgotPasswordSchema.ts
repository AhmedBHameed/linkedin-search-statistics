import {Joi, requiredEmail} from '../../../util/validations';
import {ForgotPasswordModel} from './models/ForgotPasswordModel';

const forgotPasswordSchema = Joi.object<ForgotPasswordModel>({
  email: requiredEmail(),
});

export default forgotPasswordSchema;
