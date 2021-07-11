import express, {Request, Response} from 'express';
import validateJobInput from '../use-cases/Jobs/getJobsByQuery.validation';
import environment from '../config/environment';
import getJobsByQuery from '../use-cases/Jobs/getJobsByQuery.usecase';
import {callTryCatch} from '../util/callTryCatch';

const {rootPath, apiVersion} = environment;
const JobsRouter = express.Router();

const GetJobsController = async (req: Request, res: Response) => {
  const queryParam = req.query as any;

  const {error, value} = validateJobInput(queryParam);

  if (error) {
    res.status(400).send(error);
    return;
  }

  const [jobsError, response] = await callTryCatch(async () => await getJobsByQuery(value));

  if (jobsError) {
    res.status(400).send(jobsError);
    return;
  }
  res.send(response);
};

JobsRouter.get(`${rootPath}${apiVersion}/jobs`, GetJobsController);

export {JobsRouter};
