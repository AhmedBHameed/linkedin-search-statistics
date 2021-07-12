import {Joi, requiredNumber, requiredString} from '../../util/validations';
import {JobSearchInput} from './models/JobSearchInput';

const jobSearchSchema = Joi.object<JobSearchInput>({
  year: requiredNumber(),
  perPage: requiredNumber(),
  page: requiredNumber(),
  query: requiredString(),
  location: requiredString(),
});

export default jobSearchSchema;
