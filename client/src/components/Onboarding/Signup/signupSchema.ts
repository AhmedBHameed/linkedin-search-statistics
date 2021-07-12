import {
  Joi,
  requiredEmail,
  requiredPassword,
  requiredString,
} from '../../../util/validations';
import {SignupModel} from './models/SignupModel';

const signupSchema = Joi.object<SignupModel>({
  firstName: requiredString(),
  lastName: requiredString(),
  email: requiredEmail(),
  password: requiredPassword(),
});

export default signupSchema;
