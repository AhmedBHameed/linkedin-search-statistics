import {logger} from '../../../services/Logger';
import visitorCounterModel from '../database/visitorCounterModel';
import {subMinutes} from '../../../util/time';
import {ulid} from 'ulid';

export interface VisitorInput {
  visitorKey: string;
  visitorIp: string;
  platformName: string;
}

const incVisitorCounter = async (visitorInput?: VisitorInput): Promise<Error | undefined> => {
  const {visitorIp, visitorKey, platformName} = visitorInput || {};

  try {
    const visitor = await visitorCounterModel.findOne({$and: [{$or: [{visitorKey}, {visitorIp}]}]});

    if (visitor) {
      const updatedAt = visitor.updatedAt;
      if (updatedAt < subMinutes(new Date(), 15))
        await visitorCounterModel.findOneAndUpdate(
          {$and: [{$or: [{visitorKey}, {visitorIp}]}]},
          {
            id: ulid(),
            visitorIp,
            visitorKey,
            platformName,
            $inc: {count: 1},
          },
          {upsert: true}
        );
    } else {
      await visitorCounterModel.findOneAndUpdate(
        {$or: [{visitorKey}, {visitorIp}]},
        {
          id: ulid(),
          visitorIp,
          visitorKey,
          platformName,
          count: 1,
        },
        {upsert: true}
      );
    }
  } catch (error) {
    logger.error('', error);
    return new Error(error.message);
  }
};

export default incVisitorCounter;
