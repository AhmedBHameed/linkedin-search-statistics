import jobModel, {IJobScrapModel} from '../../database/JobScrapModel';
import {logger} from '../../services/Logger';
import {ulid} from 'ulid';

export interface JobScrapData {
  query: string;
  location: string;
  jobId: string;
  title: string;
  company: string;
  place: string;
  date: string;
  link: string;
  applyLink: string;
  senorityLevel: string;
  jobFunction: string;
  description: string;
  employmentType: string;
  industries: string;
}

const upsertScrapperConfig = async (data: JobScrapData): Promise<IJobScrapModel | Error> => {
  const {jobId, date} = data;

  try {
    const jobData = await jobModel.findOneAndUpdate(
      {jobId},
      {
        ...data,
        id: ulid(),
        jobDate: date,
      },
      {upsert: true, new: true}
    );

    const result = await jobData.save();
    return result;
  } catch (error) {
    logger.error('', error);
    return new Error(error.message);
  }
};

export default upsertScrapperConfig;
