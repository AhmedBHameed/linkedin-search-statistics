import {callTryCatch} from '../../util/callTryCatch';
import {addYear, parseYearFromDate} from '../../util/time';
import jobScrapModel, {IJobScrapModel} from '../../database/JobScrapModel';
import jobSearchSettingModel, {IJobSearchSettingModel} from '../../database/JobSearchSettingModel';
import {logger} from '../../services/Logger';
import {StatisticInput} from './models/StatisticInputModel';

const getStatistics = async (
  data: StatisticInput
): Promise<
  {query: {year: string; searchValues: string[]; location: string}; statistics: IJobScrapModel[][]} | Error
> => {
  const [searchSettingsError, searchSettingsData] = await callTryCatch(async () => await jobSearchSettingModel.find());
  if (searchSettingsError) {
    logger.error('', searchSettingsError);
    return searchSettingsError as Error;
  }

  const searchSettings = searchSettingsData as IJobSearchSettingModel[];

  if (!searchSettings.length) {
    return new Error('No search settings found!');
  }

  const searchValues: string[] = [];
  const [statisticError, statisticData] = await callTryCatch(
    async () =>
      await Promise.all(
        searchSettings.map(setting => {
          searchValues.push(setting.query);
          const startDate = data.year;
          const endDate = addYear(data.year, 1);

          return jobScrapModel.aggregate<IJobScrapModel>([
            {
              $match: {
                query: setting.query,
                jobDate: {$gte: startDate, $lt: endDate},
                location: data.location.toLowerCase(),
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
            // {
            //   $limit: 2,
            // },
            {
              $project: {
                _id: 0,
                jobDateAsYearMonth: '$_id',
                query: {$first: '$jobs.query'},
                location: {$first: '$jobs.location'},
                count: '$count',
                // data: '$$ROOT',
              },
            },
          ]);
        })
      )
  );

  if (statisticError) {
    logger.error('', statisticError);
    throw statisticError as Error;
  }

  return {
    query: {year: parseYearFromDate(data.year), searchValues, location: data.location},
    statistics: statisticData as IJobScrapModel[][],
  };
};

export default getStatistics;
