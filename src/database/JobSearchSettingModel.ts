import {Document, model, Schema} from 'mongoose';
import {ExperienceLevelEnum, TimeEnum, TypeEnum} from '../use-cases/jobSearchSetting/model/ScraperSearchInput';
import {utcTime} from '../util/time';

export interface IJobSearchSetting {
  query: string;
  locations: string[]; // This will be merged with the global options => ["United States", "Europe"]
  filterTime: TimeEnum;
  filterType: TypeEnum[];
  filterExperience: ExperienceLevelEnum[];
}

export interface IJobSearchSettingModel extends IJobSearchSetting, Document {}

const JobSearchSettingSchema = new Schema(
  {
    id: {type: String, required: true, unique: true},
    query: {type: String, required: true, unique: true},
    locations: [{type: String, default: []}],
    filterTime: {type: String},
    filterType: [{type: String, default: []}],
    filterExperience: [{type: String, default: []}],
  },
  {timestamps: true}
);

JobSearchSettingSchema.pre<IJobSearchSettingModel>('save', function (this, next) {
  const utc = utcTime().valueOf().toString();
  if (!this['createdAt']) {
    this['createdAt'] = utc;
  }
  this['updatedAt'] = utc;
  next();
});

const JobSearchSettingModel = model<IJobSearchSettingModel>('JobSearchSetting', JobSearchSettingSchema);
export default JobSearchSettingModel;
