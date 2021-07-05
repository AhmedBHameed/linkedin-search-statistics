import express, {Request, Response} from 'express';
import getStatistics from '../use-cases/Statistics/getStatistics.usecase';
import {callTryCatch} from '../util/callTryCatch';

const JobStatisticsRouter = express.Router();

const GetJobStatisticsController = async (req: Request, res: Response) => {
  const [error, response] = await callTryCatch(async () => await getStatistics());

  if (error) {
    res.status(400).send(error);
  }
  res.send(response);
};

JobStatisticsRouter.get('/job/statistics', GetJobStatisticsController);

export {JobStatisticsRouter};
