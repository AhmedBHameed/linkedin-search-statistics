import joiBase, {ValidationError, Root} from 'joi';
import DateExtension from '@joi/date';
import {JobQueryInput} from './models/jobQueryInput';

const Joi = joiBase.extend(DateExtension) as Root;

interface ValidationResultData<T> {
  error?: ValidationError;
  errors?: ValidationError;
  warning?: ValidationError;
  value: T;
}

const JobInputValidationSchema = Joi.object<JobQueryInput>({
  year: Joi.date().format('yyyy').required(),
  location: Joi.string().required(),
  query: Joi.string().required(),
  perPage: Joi.number().required(),
  page: Joi.number().required(),
});

const validateJobInput = (data: JobQueryInput): ValidationResultData<JobQueryInput> => {
  return JobInputValidationSchema.validate(data, {abortEarly: false});
};

export default validateJobInput;
