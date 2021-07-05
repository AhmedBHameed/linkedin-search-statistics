import jobSearchSettingModel, {IJobSearchSetting} from '../../database/JobSearchSettingModel';
import {ulid} from 'ulid';
import {logger} from '../../services/Logger';
import {ScraperSearchInput} from './model/ScraperSearchInput';

const upsertJobSearchSettings = async (data: ScraperSearchInput): Promise<IJobSearchSetting | Error> => {
  data.query = data.query.toLowerCase();
  const {query} = data;

  try {
    const MutatedSession = await jobSearchSettingModel.findOneAndUpdate(
      {query},
      {
        ...data,
        id: ulid(),
      },
      {upsert: true, new: true}
    );

    const result = await MutatedSession.save();
    return result;
  } catch (error) {
    logger.error('', error);
    return new Error(error.message);
  }
};

export default upsertJobSearchSettings;
