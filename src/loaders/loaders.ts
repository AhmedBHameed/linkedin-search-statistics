import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import environment from 'src/config/environment';
import {xss} from 'src/services/xss-clean';
import logWelcome from 'src/util/logWelcome';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import {validateTokens} from '../middlewares/validateTokens';
import {bindLoggerToGlobalErrorHandlers, logger} from '../services/Logger';
import MongoConnectionClass from '../database/MongoConnectionLocator';
import {JobSearchSettingRouter} from '../Controllers/JobSearchSettingController';
import {JobStatisticsRouter} from '../Controllers/JobStatisticsController';
import cronJob from '../services/cronJob';
import {JobsRouter} from '../Controllers/JobsController';
import {connectRedis} from '../services/redisClient';
import {listRoutes} from '../util/listRoutes';
import {JobSearchLocationsRouter} from '../Controllers/JobSearchLocationsController';
import {JobsScrapWebAppRouter} from '../Controllers/JobStatisticWebController';
import {JobWebTotalVisitorsRouter} from '../Controllers/JobWebTotalVisitorsController';

const {port, allowCorsDomains, isProd, rootPath} = environment;

export default async (): Promise<void> => {
  bindLoggerToGlobalErrorHandlers();

  const readyState = await new MongoConnectionClass().connect();
  await connectRedis();
  if (readyState !== 1) throw new Error('🔥 Mongo DB are not ready! please check log file!');

  const app = express();
  app.disable('x-powered-by');
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowCorsDomains.includes(origin)) {
          callback(null, true);
          return;
        }
        const error = new Error('Not allowed by CORS');
        logger.error(error);
        callback(error);
      },
      credentials: true,
    })
  );
  app.use(xss());
  app.use(cookieParser());
  app.use(validateTokens());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(mongoSanitize());
  app.use(helmet({contentSecurityPolicy: false}));

  app.use(`${rootPath}/static`, express.static('client/build/static'));

  app.use(JobsRouter);
  app.use(JobSearchSettingRouter);
  app.use(JobStatisticsRouter);
  app.use(JobSearchLocationsRouter);
  app.use(JobWebTotalVisitorsRouter);

  app.use(JobsScrapWebAppRouter);

  await cronJob.run();
  app.listen(port, () => {
    logWelcome();

    !isProd && listRoutes(app._router.stack);
  });
};
