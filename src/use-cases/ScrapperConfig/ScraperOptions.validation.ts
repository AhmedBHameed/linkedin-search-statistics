import {ValidationError} from '@hapi/joi';
import Joi from '@hapi/joi';
import {
  ExperienceLevelEnum,
  ScraperSearchInput,
  TimeEnum,
  TypeEnum,
} from '../jobSearchSetting/model/ScraperSearchInput';

interface ValidationResultData<T> {
  error?: ValidationError;
  errors?: ValidationError;
  warning?: ValidationError;
  value: T;
}

const ScraperOptionsValidationSchema = Joi.object<ScraperSearchInput>({
  query: Joi.string().required(),
  locations: Joi.array().items(Joi.string()),
  filterTime: Joi.string().valid(...Object.values(TimeEnum)),
  filterType: Joi.array().items(
    Joi.string().valid(TypeEnum.CONTRACT),
    Joi.string().valid(TypeEnum.FULL_TIME),
    Joi.string().valid(TypeEnum.INTERNSHIP),
    Joi.string().valid(TypeEnum.OTHER),
    Joi.string().valid(TypeEnum.PART_TIME),
    Joi.string().valid(TypeEnum.TEMPORARY),
    Joi.string().valid(TypeEnum.VOLUNTEER)
  ),
  filterExperience: Joi.array().items(
    Joi.string().valid(ExperienceLevelEnum.ASSOCIATE),
    Joi.string().valid(ExperienceLevelEnum.DIRECTOR),
    Joi.string().valid(ExperienceLevelEnum.ENTRY_LEVEL),
    Joi.string().valid(ExperienceLevelEnum.EXECUTIVE),
    Joi.string().valid(ExperienceLevelEnum.INTERNSHIP),
    Joi.string().valid(ExperienceLevelEnum.MID_SENIOR)
  ),
  searchLimit: Joi.number().required(),
});

const validateScraperSearchInput = (data: ScraperSearchInput): ValidationResultData<ScraperSearchInput> => {
  return ScraperOptionsValidationSchema.validate(data, {abortEarly: false});
};

export default validateScraperSearchInput;
