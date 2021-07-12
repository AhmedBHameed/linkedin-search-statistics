const envName = process.env.NODE_ENV;
const appVersion = process.env.REACT_APP_VERSION;
const isProduction = envName === 'production';

const environment = {
  isTestEnv: envName === 'test',
  appVersion,
  envName,
  authDomainApi: isProduction
    ? 'https://ahmedhameed.dev'
    : 'http://localhost:5000',
  domainApi: isProduction
    ? 'https://www.ahmedhameed.dev'
    : 'http://localhost:5050',
  isProduction,
};

export default environment;
