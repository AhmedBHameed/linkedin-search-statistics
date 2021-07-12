import express, {Request, Response} from 'express';
import environment from '../config/environment';
import {visitorCounter} from '../middlewares/visitorCounter/visitorCounter';
import {resolve} from 'path';

const {rootPath} = environment;
const JobsScrapWebAppRouter = express.Router();

const GetJobsScrapWebAppController = async (req: Request, res: Response) => {
  await visitorCounter({platformName: 'jobs scrap'})(req, res);

  res.set('Content-Type', 'text/html').sendFile(resolve('client/build/index.html'));
};

JobsScrapWebAppRouter.get(`${rootPath}/*`, GetJobsScrapWebAppController);

export {JobsScrapWebAppRouter};
