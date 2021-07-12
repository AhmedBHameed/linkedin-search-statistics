import express, {Request, Response} from 'express';
import countVisitors from '../middlewares/visitorCounter/usecase/countVisitors.usecase';
import environment from '../config/environment';
import {callTryCatch} from '../util/callTryCatch';

const {rootPath, apiVersion} = environment;
const JobWebTotalVisitorsRouter = express.Router();

const GetJobWebTotalVisitorsController = async (req: Request, res: Response) => {
  const [error, response] = await callTryCatch(async () => await countVisitors('jobs scrap'));
  if (error) {
    res.status(400).send(error);
    return;
  }
  res.send(response);
};

JobWebTotalVisitorsRouter.get(`${rootPath}${apiVersion}/total-visits`, GetJobWebTotalVisitorsController);

export {JobWebTotalVisitorsRouter};
