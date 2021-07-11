import {callTryCatch} from '../../util/callTryCatch';
import {addYear, stringYearToDate} from '../../util/time';
import jobScrapModel, {IJobScrapModel} from '../../database/JobScrapModel';
import {JobQueryInput} from './models/jobQueryInput';

const getJobsByQuery = async (inputData: JobQueryInput): Promise<{jobs: IJobScrapModel[]; count: number} | Error> => {
  const {location, query, year, perPage, page} = inputData;
  const startDate = stringYearToDate(year);
  const endDate = addYear(year, 1);

  const [jobsError, jobsData] = await callTryCatch(
    async () =>
      await jobScrapModel.aggregate<IJobScrapModel>([
        {
          $facet: {
            jobs: [
              {
                $match: {
                  jobDate: {$gte: startDate, $lt: endDate},
                  location: location.toLowerCase(),
                  query: query.toLowerCase(),
                },
              },
              {$skip: perPage * (page - 1)},
              {$limit: perPage * page},
            ],
            totalCount: [
              {
                $match: {
                  jobDate: {$gte: startDate, $lt: endDate},
                  location: location.toLowerCase(),
                  query: query.toLowerCase(),
                },
              },
              {
                $group: {
                  _id: null,
                  count: {$sum: 1},
                },
              },
            ],
          },
        },
      ])
  );

  if (jobsError) {
    return jobsError as Error;
  }

  const results = jobsData as any;
  return {jobs: results[0].jobs, count: results[0].totalCount[0].count};
};

export default getJobsByQuery;
