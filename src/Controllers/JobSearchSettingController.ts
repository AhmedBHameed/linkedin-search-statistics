import express, {Request, Response} from 'express';
import upsertJobSearchSettings from '../use-cases/jobSearchSetting/upsertJobSearchSettings.usecase';
import getJobSearchSettings from '../use-cases/jobSearchSetting/getJobSearchSettings.usecase';
import {callTryCatch} from '../util/callTryCatch';
import validateScraperSearchInput from '../use-cases/ScrapperConfig/ScraperOptions.validation';
import environment from '../config/environment';
import {ParsedTokenData, ac} from '../services/AccessControl';
import {ErrorModel} from './shared/models/errorModel';
import {Permission} from 'accesscontrol';
import {PERMISSION_DENIED} from '../use-cases/commonErrors';

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
  const {sessionData, sessionError} = req as Request & {sessionData: ParsedTokenData; sessionError: ErrorModel};

  if (sessionError) {
    const {statusCode} = sessionError;
    res.status(statusCode).send(sessionError);
    return;
  }

  const [_, permission] = await callTryCatch(async () => ac.can(sessionData.role).createAny('settings'));

  if (!(permission as Permission)?.granted) {
    const {statusCode} = PERMISSION_DENIED;
    res.status(statusCode).send(PERMISSION_DENIED);
    return;
  }

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
