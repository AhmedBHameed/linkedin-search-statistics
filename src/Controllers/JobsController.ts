import express, {Request, Response} from 'express';
import getJobsByQuery from '../use-cases/Jobs/getJobsByQuery.usecase';
import {callTryCatch} from '../util/callTryCatch';

const JobsRouter = express.Router();

const GetJobsController = async (req: Request, res: Response) => {
  const queryParam = req.query.jobQuery as string;

  if (queryParam) {
    const [error, response] = await callTryCatch(async () => await getJobsByQuery(queryParam.toLowerCase()));

    if (error) {
      res.status(400).send(error);
    }
    res.send(response);
  } else {
    res.status(400).send(new Error('Please provide job query in url like "<URL>/jobs?query=node.js"'));
  }
};

JobsRouter.get('/jobs', GetJobsController);

export {JobsRouter};
