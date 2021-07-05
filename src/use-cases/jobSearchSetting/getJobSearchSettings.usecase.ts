import jobSearchSettingModel, {IJobSearchSettingModel} from '../../database/JobSearchSettingModel';
import {logger} from '../../services/Logger';

const getJobSearchSettings = async (): Promise<IJobSearchSettingModel[] | Error> => {
  try {
    const searchSettings = await jobSearchSettingModel.find();

    return searchSettings;
  } catch (error) {
    logger.error('', error);
    return new Error(error.message);
  }
};

export default getJobSearchSettings;
