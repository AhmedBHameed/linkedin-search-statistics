import jobSearchSettingModel, {IJobSearchSetting} from '../../database/JobSearchSettingModel';
import jobSearchLocationModel, {IJobSearchLocationModel} from '../../database/JobSearchLocationModel';
import {ulid} from 'ulid';
import {logger} from '../../services/Logger';
import {ScraperSearchInput} from './model/ScraperSearchInput';
import {callTryCatch} from 'src/util/callTryCatch';

const upsertJobSearchSettings = async (
  data: ScraperSearchInput
): Promise<(IJobSearchSetting & {locations: string[]}) | Error> => {
  data.query = data.query.toLowerCase();
  const {backgroundColor, borderColor, locations, ...reset} = data;

  const [_, locationResults] = await callTryCatch(async () => await jobSearchLocationModel.findOne());
  const locationsId = locationResults as IJobSearchLocationModel | null;

  const [error] = await callTryCatch(
    async () =>
      await jobSearchLocationModel.findOneAndUpdate(
        {id: locationsId?.id || ''},
        {
          id: ulid(),
          $addToSet: {locations: locations.map(location => location.toLowerCase())},
        },
        {
          upsert: true,
        }
      )
  );

  if (error) {
    logger.error('', error);
    throw error;
  }

  try {
    const MutatedSession = await jobSearchSettingModel.findOneAndUpdate(
      {query: reset.query},
      {
        ...reset,
        id: ulid(),
        locations: locations.map(value => value.toLowerCase()),
        chartConfig: {
          backgroundColor,
          borderColor,
        },
      },
      {upsert: true, new: true}
    );

    const result = await MutatedSession.save();
    return {...result.toObject(), locations};
  } catch (error) {
    logger.error('', error);
    throw error;
  }
};

export default upsertJobSearchSettings;
