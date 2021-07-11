import {Joi, requiredEmail, requiredPassword} from '../../../util/validations';
import {LoginInput} from './models/LoginInput';

const loginSchema = Joi.object<LoginInput>({
  email: requiredEmail(),
  password: requiredPassword(),
});

export default loginSchema;
