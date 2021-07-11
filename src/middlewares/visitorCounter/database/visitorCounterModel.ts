import {Document, model, Schema} from 'mongoose';
import {utcTime} from '../../../util/time';

export interface IVisitorCounter {
  visitorKey: string;
  visitorIp: string;
  platformName: string;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVisitorCounterModel extends IVisitorCounter, Document {}

const VisitorCounterSchema = new Schema(
  {
    id: {type: String, unique: true},
    platformName: {type: String, required: true},
    visitorKey: {type: String, required: true},
    visitorIp: {type: String, required: true},
    count: {type: Number, required: true},
  },
  {timestamps: true}
);

VisitorCounterSchema.pre<IVisitorCounterModel>('save', function (this, next) {
  const utc = utcTime().toDate();
  if (!this['createdAt']) {
    this['createdAt'] = utc;
  }
  this['updatedAt'] = utc;
  next();
});

const VisitorCounterModel = model<IVisitorCounterModel>('VisitorsCounter', VisitorCounterSchema);
export default VisitorCounterModel;
