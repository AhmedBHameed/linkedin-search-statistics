import {callTryCatch} from 'src/util/callTryCatch';
import jobScrapModel, {IJobScrapModel} from '../../database/JobScrapModel';
import jobSearchSettingModel, {IJobSearchSettingModel} from '../../database/JobSearchSettingModel';
import {logger} from '../../services/Logger';

export interface StatisticData {
  jobDateAsYearMonth: string;
  query: string;
  count: number;
}

const getStatistics = async (): Promise<IJobScrapModel[][] | Error> => {
  const [searchSettingsError, searchSettingsData] = await callTryCatch(async () => await jobSearchSettingModel.find());
  if (searchSettingsError) {
    logger.error('', searchSettingsError);
    return searchSettingsError as Error;
  }

  const searchSettings = searchSettingsData as IJobSearchSettingModel[];

  if (!searchSettings.length) {
    return new Error('No search settings found!');
  }

  const [statisticError, statisticData] = await callTryCatch(
    async () =>
      await Promise.all(
        searchSettings.map(setting => {
          return jobScrapModel.aggregate<IJobScrapModel>([
            {
              $match: {
                query: setting.query,
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
                // data: '$$ROOT',
              },
            },
          ]);
        })
      )
  );

  if (statisticError) {
    return statisticError as Error;
  }

  return statisticData as IJobScrapModel[][];
};

export default getStatistics;
