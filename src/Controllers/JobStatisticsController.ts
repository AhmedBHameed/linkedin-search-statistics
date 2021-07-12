import express, {Request, Response} from 'express';
import validateStatisticInput from 'src/use-cases/Statistics/ScraperOptions.validation';
import environment from '../config/environment';
import getStatistics from '../use-cases/Statistics/getStatistics.usecase';
import {callTryCatch} from '../util/callTryCatch';

const {rootPath, apiVersion} = environment;

const JobStatisticsRouter = express.Router();

const GetJobStatisticsController = async (req: Request, res: Response) => {
  const yearQuery = req.query.year as string;
  const locationQuery = req.query.location as string;
  const {error, value} = validateStatisticInput({year: yearQuery, location: locationQuery});

  if (error) {
    res.status(400).send(error);
    return;
  }

  const [catchError, response] = await callTryCatch(async () => await getStatistics(value));

  if (catchError) {
    res.status(400).send(catchError);
    return;
  }
  res.send(response);
};

JobStatisticsRouter.get(`${rootPath}${apiVersion}/statistics`, GetJobStatisticsController);

export {JobStatisticsRouter};
