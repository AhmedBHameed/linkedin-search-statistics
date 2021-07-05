import {Document, model, Schema} from 'mongoose';
import {utcTime} from '../util/time';

export interface IJobScrap {
  jobId: string;
  location: string;
  title: string;
  query: string;
  company: string;
  place: string;
  jobDate: string;
  link: string;
  applyLink: string;
  senorityLevel: string;
  jobFunction: string;
  employmentType: string;
  industries: string;
}

export interface IJobScrapModel extends IJobScrap, Document {}

const JobScrapSchema = new Schema(
  {
    id: {type: String, required: true, unique: true},
    jobId: {type: String, required: true, unique: true},
    query: {type: String, default: ''},
    location: {type: String, required: true},
    title: {type: String, default: ''},
    company: {type: String, default: 'N/A'},
    place: {type: String, default: ''},
    jobDate: {type: Date, default: ''},
    link: {type: String, default: ''},
    applyLink: {type: String, default: ''},
    senorityLevel: {type: String, default: ''},
    description: {type: String, default: ''},
    jobFunction: {type: String, default: ''},
    employmentType: {type: String, default: ''},
    industries: {type: String, default: ''},
  },
  {timestamps: true}
);

JobScrapSchema.pre<IJobScrapModel>('save', function (this, next) {
  const utc = utcTime().valueOf().toString();
  if (!this['createdAt']) {
    this['createdAt'] = utc;
  }
  this['updatedAt'] = utc;
  next();
});

const JobScrapModel = model<IJobScrapModel>('JobScrap', JobScrapSchema);
export default JobScrapModel;
