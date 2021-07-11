const BASE_PATH = process.env.PUBLIC_URL;

const NAVIGATION_ROUTES = {
  basePath: {
    path: BASE_PATH,
  },
  login: {
    exact: true,
    path: '/login',
  },
  signup: {
    exact: true,
    path: '/signup',
  },
  resetPassword: {
    exact: true,
    path: '/password/reset',
    params: '/:userId/:verificationId',
  },
  forgotPassword: {
    exact: true,
    path: '/password/forgotten',
  },
  dashboard: {
    strict: true,
    path: '/dashboard',
  },
  statistics: {
    strict: true,
    path: '/',
  },
};

export default NAVIGATION_ROUTES;
