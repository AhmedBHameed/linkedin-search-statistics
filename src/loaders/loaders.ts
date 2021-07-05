import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import environment from 'src/config/environment';
import {xss} from 'src/services/xss-clean';
import logWelcome from 'src/util/logWelcome';
import helmet from 'helmet';

import {bindLoggerToGlobalErrorHandlers, logger} from '../services/Logger';
import MongoConnectionClass from '../services/MongoConnectionLocator';
import {JobSearchSettingRouter} from '../Controllers/JobSearchSettingController';
import {JobStatisticsRouter} from '../Controllers/JobStatisticsController';
import cronJob from '../services/cronJob';
import {JobsRouter} from '../Controllers/JobsController';

const {port, allowCorsDomains, rootPath} = environment;

export default async (): Promise<void> => {
  bindLoggerToGlobalErrorHandlers();

  const readyState = await new MongoConnectionClass().connect();

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
  app.use(helmet({contentSecurityPolicy: false}));
  app.use(xss());
  // app.use(cookieParser());
  app.set('view engine', 'handlebars');
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(mongoSanitize());

  app.use(`${rootPath}/public`, express.static('public/assets'));

  app.use(JobsRouter);
  app.use(JobSearchSettingRouter);
  app.use(JobStatisticsRouter);

  await cronJob.run();
  app.listen(port, () => logWelcome());
};
