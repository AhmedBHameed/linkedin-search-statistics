import {Permission} from 'accesscontrol';
import express, {Request, Response} from 'express';
import {ac, ParsedTokenData} from '../services/AccessControl';
import {PERMISSION_DENIED} from '../use-cases/commonErrors';
import getJobSearchLocations from '../use-cases/getJobLocations.ts/getJobLocations.usecase';
import environment from '../config/environment';
import {callTryCatch} from '../util/callTryCatch';
import {ErrorModel} from './shared/models/errorModel';

const {rootPath, apiVersion} = environment;
const JobSearchLocationsRouter = express.Router();

const GetJobSearchLocationsController = async (req: Request, res: Response) => {
  const {sessionData, sessionError} = req as Request & {sessionData: ParsedTokenData; sessionError: ErrorModel};

  if (sessionError) {
    const {statusCode} = sessionError;
    res.status(statusCode).send(sessionError);
    return;
  }

  const [_, permission] = await callTryCatch(async () => ac.can(sessionData.role).createAny('location'));

  if (!(permission as Permission)?.granted) {
    const {statusCode} = PERMISSION_DENIED;
    res.status(statusCode).send(PERMISSION_DENIED);
    return;
  }

  const [error, response] = await callTryCatch(async () => await getJobSearchLocations());
  if (error) {
    res.status(400).send(error);
  }
  res.send(response);
};

JobSearchLocationsRouter.get(`${rootPath}${apiVersion}/job/locations`, GetJobSearchLocationsController);

export {JobSearchLocationsRouter};
