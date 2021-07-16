import {Document, model, Schema} from 'mongoose';
import {utcTime} from '../util/time';

export interface IJobScrapHook {
  apiHookKey: string;
}

export interface IJobScrapHookModel extends IJobScrapHook, Document {}

const JobScrapHookSchema = new Schema(
  {
    id: {type: String, required: true, unique: true},
    apiHookKey: {type: String, required: true},
  },
  {timestamps: true}
);

JobScrapHookSchema.pre<IJobScrapHookModel>('save', function (this, next) {
  const utc = utcTime().valueOf().toString();
  if (!this['createdAt']) {
    this['createdAt'] = utc;
  }
  this['updatedAt'] = utc;
  next();
});

const JobScrapHookModel = model<IJobScrapHookModel>('JobScrapHook', JobScrapHookSchema);
export default JobScrapHookModel;
