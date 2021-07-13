const {BUILD_ENV, LOG_LEVEL, MONGODB_PASS, REDIS_PASSWORD, LI_AT_COOKIE, VERSION} = process.env;

const port = '5050';
const isProd = BUILD_ENV === 'production';

export default {
  allowCorsDomains: isProd
    ? ['https://ahmedhameed.dev', 'https://www.ahmedhameed.dev']
    : ['http://localhost:5050', 'http://localhost:3000', 'http://192.168.0.94:3000'],
  rootPath: '/jobs-scrap',
  apiVersion: '/api/v1',
  database: {
    dbName: 'admin',
    password: MONGODB_PASS,
    port: 27017,
    server: isProd ? 'mongo' : 'localhost',
    user: 'super',
  },
  isProd,
  loggerConfig: {
    dir: 'logs',
    level: LOG_LEVEL || 'silly',
  },
  authenticationService: {
    host: isProd ? 'authentication' : 'localhost',
    port: 5001,
  },
  redis: {
    host: isProd ? 'redis' : 'localhost',
    password: REDIS_PASSWORD,
    port: 6379,
  },
  liAtCookie: LI_AT_COOKIE || '',
  port,
  version: VERSION,
};
