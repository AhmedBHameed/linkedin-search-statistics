import {logger} from '../../../services/Logger';
import visitorCounterModel from '../database/visitorCounterModel';

export interface VisitorInput {
  visitorKey: string;
  visitorIp: string;
}

const countVisitors = async (platformName: string): Promise<number | Error> => {
  try {
    const visitors = await visitorCounterModel.aggregate([
      {$match: platformName},
      {
        $group: {
          _id: null,
          totalVisitors: {
            $sum: '$count',
          },
        },
      },
    ]);

    return visitors[0].totalVisitors as number;
  } catch (error) {
    logger.error('', error);
    return new Error(error.message);
  }
};

export default countVisitors;
