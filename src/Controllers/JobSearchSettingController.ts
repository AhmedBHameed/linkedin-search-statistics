import express, {Request, Response} from 'express';
import upsertJobSearchSettings from '../use-cases/jobSearchSetting/upsertJobSearchSettings.usecase';
import getJobSearchSettings from '../use-cases/jobSearchSetting/getJobSearchSettings.usecase';
import {callTryCatch} from '../util/callTryCatch';
import validateScraperSearchInput from '../use-cases/ScrapperConfig/ScraperOptions.validation';
import environment from '../config/environment';

const {rootPath, apiVersion} = environment;

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

  const [error, response] = await callTryCatch(async () => upsertJobSearchSettings(validationResult.value));

  if (error) {
    res.status(400).send(error);
    return;
  }
  res.send(response);
};

JobSearchSettingRouter.post(`${rootPath}${apiVersion}/settings`, StoreJobSearchSettingController);
JobSearchSettingRouter.get(`${rootPath}${apiVersion}/settings`, GetJobSearchSettingController);

export {JobSearchSettingRouter};
