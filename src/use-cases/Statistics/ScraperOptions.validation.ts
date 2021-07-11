import joiBase, {ValidationError, Root} from 'joi';
import DateExtension from '@joi/date';
import {StatisticInput} from './models/StatisticInputModel';

const Joi = joiBase.extend(DateExtension) as Root;

interface ValidationResultData<T> {
  error?: ValidationError;
  errors?: ValidationError;
  warning?: ValidationError;
  value: T;
}

const StatisticInputValidationSchema = Joi.object<StatisticInput>({
  year: Joi.date().format('yyyy').required(),
  location: Joi.string().required(),
});

const validateStatisticInput = (data: StatisticInput): ValidationResultData<StatisticInput> => {
  return StatisticInputValidationSchema.validate(data, {abortEarly: false});
};

export default validateStatisticInput;
