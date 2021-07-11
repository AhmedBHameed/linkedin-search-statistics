import {NextFunction, Request, RequestHandler, Response} from 'express';
import AUTH_END_POINT from './authApiPaths';
import {httpClient} from '../services/httpClient';
import apiRateLimit from '../util/apiRateLimit';
import {MISSING_TOKENS, INTERNAL_SERVER_ERROR, TOO_MANY_REQUESTS} from './errors';

export const validateTokens = (): RequestHandler => async (req: Request, res: Response, next: NextFunction) => {
  req['sessionData'] = {};
  const accessToken = req.cookies['ACCESS_TOKEN'];
  const refreshToken = req.cookies['REFRESH_TOKEN'];

  if (!accessToken && !refreshToken) {
    req['sessionError'] = MISSING_TOKENS;
    return next();
  }

  const isExceeded = await apiRateLimit(accessToken || refreshToken);
  if (isExceeded) {
    res.status(TOO_MANY_REQUESTS.statusCode).send(TOO_MANY_REQUESTS);
    return;
  }

  try {
    if (accessToken) {
      const accessTokenResult = await httpClient.post<{
        id: string | undefined;
        role: string | null;
      }>(AUTH_END_POINT.verifyToken, {
        accessToken,
        appName: 'KAK',
      });
      req['sessionData'] = accessTokenResult.data;
      return next();
    }
  } catch (error) {
    const resError = INTERNAL_SERVER_ERROR(error);
    res.status(resError.statusCode).send(resError);
  }

  try {
    if (refreshToken) {
      const refreshTokenResult = await httpClient.post<{
        id: string | undefined;
        role: string | null;
        accessToken: string;
        refreshToken: string;
        accessTokenExpire: number;
        refreshTokenExpire: number;
      }>(AUTH_END_POINT.refreshTokens, {
        refreshToken,
        appName: 'KAK',
      });

      const {accessTokenExpire, refreshTokenExpire, ...rest} = refreshTokenResult.data;
      req['sessionData'] = {id: rest.id, role: rest.role};
      res.cookie('ACCESS_TOKEN', rest.accessToken, {maxAge: accessTokenExpire, httpOnly: true});
      res.cookie('REFRESH_TOKEN', rest.refreshToken, {maxAge: refreshTokenExpire, httpOnly: true});
    }
  } catch (error) {
    req['sessionError'] = error;
  }
  return next();
};
