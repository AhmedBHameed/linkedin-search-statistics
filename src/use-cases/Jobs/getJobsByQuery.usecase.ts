import {callTryCatch} from 'src/util/callTryCatch';
import jobScrapModel, {IJobScrapModel} from '../../database/JobScrapModel';

const getJobsByQuery = async (query: string): Promise<IJobScrapModel[] | Error> => {
  const [jobsError, jobsData] = await callTryCatch(async () =>
    jobScrapModel.aggregate<IJobScrapModel>([
      {
        $match: {
          query: query,
          jobDate: {$ne: null},
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m',
              date: '$jobDate',
            },
            // query: '$query',
            // month: {$month: '$jobDate'},
            // year: {$year: '$jobDate'},
          },
          jobs: {
            $push: '$$ROOT',
          },
          count: {$sum: 1},
        },
      },
      {
        /* sort descending (latest subscriptions first) */
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
        },
      },
      {
        $limit: 2,
      },
      {
        $project: {
          _id: 0,
          jobDateAsYearMonth: '$_id',
          query: {$first: '$jobs.query'},
          count: '$count',
          data: '$$ROOT',
        },
      },
    ])
  );

  if (jobsError) {
    return jobsError as Error;
  }

  return jobsData as IJobScrapModel[];
};

export default getJobsByQuery;
