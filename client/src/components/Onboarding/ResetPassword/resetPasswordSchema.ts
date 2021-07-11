import {
  confirmPasswordWith,
  Joi,
  requiredPassword,
} from '../../../util/validations';
import {ResetPasswordModel} from './models/ResetPasswordModel';

const resetPasswordSchema = Joi.object<ResetPasswordModel>({
  newPassword: requiredPassword(),
  confirmPassword: confirmPasswordWith('newPassword'),
});

export default resetPasswordSchema;
