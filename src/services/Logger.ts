import winston from 'winston';
import Transport from 'winston-transport';

import environment from '../config/environment';

const {isProd, loggerConfig} = environment;

type Logger = winston.Logger;

const _transports: Transport[] = [
  new winston.transports.File({
    level: loggerConfig.level,
    filename: `${loggerConfig.dir}/app.log`,
    handleExceptions: true,
    maxsize: 1000000, // 1MB
    maxFiles: 5,
  }),
  !environment.isProd
    ? new winston.transports.Console()
    : new winston.transports.Console({
        format: winston.format.combine(winston.format.cli(), winston.format.splat()),
      }),
];

const logger = winston.createLogger({
  level: loggerConfig.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({stack: !isProd}),
    winston.format.splat(),
    winston.format.json()
    // winston.format.prettyPrint()
  ),
  transports: _transports,
});

const bindLoggerToGlobalErrorHandlers = () => {
  process
    .on('unhandledRejection', reason => {
      if (reason) {
        logger.error(`UNHANDLED_REJECTION:`, reason, () => {
          throw reason;
        });
      }
    })
    .on('uncaughtException', error => {
      logger.error(`UNCAUGHT_EXCEPTION:`, error, () => {
        throw error;
      });
    });
};

export {bindLoggerToGlobalErrorHandlers, logger, Logger};
