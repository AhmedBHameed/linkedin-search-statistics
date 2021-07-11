import {
  Joi,
  optionalString,
  requiredEmail,
  requiredPassword,
  requiredString,
} from '../../../util/validations';
import {SignupModel} from './models/SignupModel';

const signupSchema = Joi.object<SignupModel>({
  email: requiredEmail(),
  password: requiredPassword(),
  country: requiredString(),
  firstName: requiredString(),
  practicePlace: optionalString(),
  lastName: requiredString(),
  phone: requiredString(),
  medicalSpeciality: requiredString(),
  title: requiredString(),
  termsAndConditionsConsent: Joi.boolean().invalid(false),
  licensedDoctor: Joi.boolean().invalid(false),
});

export default signupSchema;
