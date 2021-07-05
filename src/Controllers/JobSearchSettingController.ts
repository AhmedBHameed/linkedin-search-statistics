import express, {Request, Response} from 'express';
import upsertJobSearchSettings from '../use-cases/jobSearchSetting/upsertJobSearchSettings.usecase';
import getJobSearchSettings from '../use-cases/jobSearchSetting/getJobSearchSettings.usecase';
import {callTryCatch} from '../util/callTryCatch';
import validateScraperSearchInput from '../use-cases/ScrapperConfig/ScraperOptions.validation';

const JobSearchSettingRouter = express.Router();

const GetJobSearchSettingController = async (req: Request, res: Response) => {
  const [error, response] = await callTryCatch(async () => await getJobSearchSettings());

  if (error) {
    res.status(400).send(error);
  }
  res.send(response);
};

const StoreJobSearchSettingController = async (req: Request, res: Response) => {
  const validationResult = validateScraperSearchInput(req.body);
  if (validationResult.error) {
    res.status(400).send({error: validationResult.error});
    return;
  }

  const [error, response] = await callTryCatch(async () => await upsertJobSearchSettings(validationResult.value));

  if (error) {
    res.status(400).send(error);
  }
  res.send(response);
};

JobSearchSettingRouter.post('/job/settings', StoreJobSearchSettingController);
JobSearchSettingRouter.get('/job/settings', GetJobSearchSettingController);

export {JobSearchSettingRouter};
