import jobLocations, {IJobSearchLocationModel} from '../../database/JobSearchLocationModel';
import {logger} from '../../services/Logger';

const getJobSearchLocations = async (): Promise<IJobSearchLocationModel | null | Error> => {
  try {
    const searchLocations = await jobLocations.findOne();

    return searchLocations;
  } catch (error) {
    logger.error('', error);
    return new Error(error.message);
  }
};

export default getJobSearchLocations;
