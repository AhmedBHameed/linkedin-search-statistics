import {Document, model, Schema} from 'mongoose';
import {utcTime} from '../util/time';

export interface IJobSearchLocation {
  locations: string[];
}

export interface IJobSearchLocationModel extends IJobSearchLocation, Document {}

const JobSearchLocationSchema = new Schema(
  {
    id: {type: String, required: true, unique: true},
    locations: [{type: [String], required: true}],
  },
  {timestamps: true}
);

JobSearchLocationSchema.pre<IJobSearchLocationModel>('save', function (this, next) {
  const utc = utcTime().valueOf().toString();
  if (!this['createdAt']) {
    this['createdAt'] = utc;
  }
  this['updatedAt'] = utc;
  next();
});

const JobSearchLocationModel = model<IJobSearchLocationModel>('JobSearchLocation', JobSearchLocationSchema);
export default JobSearchLocationModel;
