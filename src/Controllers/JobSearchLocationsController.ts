import express, {Request, Response} from 'express';
import getJobSearchLocations from 'src/use-cases/getJobLocations.ts/getJobLocations.usecase';
import environment from '../config/environment';
import {callTryCatch} from '../util/callTryCatch';

const {rootPath, apiVersion} = environment;
const JobSearchLocationsRouter = express.Router();

const GetJobSearchLocationsController = async (req: Request, res: Response) => {
  const [error, response] = await callTryCatch(async () => await getJobSearchLocations());
  if (error) {
    res.status(400).send(error);
  }
  res.send(response);
};

JobSearchLocationsRouter.get(`${rootPath}${apiVersion}/job/locations`, GetJobSearchLocationsController);

export {JobSearchLocationsRouter};
