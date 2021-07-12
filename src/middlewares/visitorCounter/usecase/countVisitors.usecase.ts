import {logger} from '../../../services/Logger';
import visitorCounterModel from '../database/visitorCounterModel';

export interface VisitorInput {
  visitorKey: string;
  visitorIp: string;
}

const countVisitors = async (platformName: string): Promise<{totalVisits: number} | Error> => {
  try {
    const visitors = await visitorCounterModel.aggregate([
      {$match: {platformName}},
      {
        $group: {
          _id: null,
          totalVisits: {
            $sum: '$count',
          },
        },
      },
    ]);

    return {totalVisits: visitors[0].totalVisits};
  } catch (error) {
    logger.error('', error);
    return new Error(error.message);
  }
};

export default countVisitors;
