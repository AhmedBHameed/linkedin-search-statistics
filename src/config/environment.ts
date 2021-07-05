const {BUILD_ENV, LOG_LEVEL, MONGODB_PASS, VERSION} = process.env;

const port = '5050';
const isProd = BUILD_ENV === 'production';

export default {
  allowCorsDomains: isProd
    ? ['https://ahmedhameed.dev', 'https://www.ahmedhameed.dev']
    : ['http://localhost:5000', 'http://localhost:3000'],
  apiVersion: 'v1',
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
  port,
  rootPath: '/nodeys',
  version: VERSION,
};
