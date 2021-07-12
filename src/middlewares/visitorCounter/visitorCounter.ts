import {NextFunction, Request, Response} from 'express';
import {clientIp} from '../../util/clientIp';
import incVisitorCounter from './usecase/incVisitorCounter.usecase';
import {ulid} from 'ulid';

const VISITOR_COOKIE_KEY_NAME = 'VISITOR_KEY';

export const visitorCounter =
  (config: {platformName: string}) => async (req: Request, res: Response, next?: NextFunction) => {
    const visitorKey = req.cookies[VISITOR_COOKIE_KEY_NAME];
    const visitorIp = clientIp(req);

    if (!visitorKey && !visitorIp) {
      if (next) {
        return next();
      }
    }

    if (visitorKey) {
      await incVisitorCounter({visitorIp, visitorKey, platformName: config.platformName});
    } else {
      const newVisitorKey = ulid();
      await incVisitorCounter({visitorIp, visitorKey: newVisitorKey, platformName: config.platformName});
      res.cookie(VISITOR_COOKIE_KEY_NAME, newVisitorKey, {maxAge: 15 * 60 * 1000, httpOnly: true});
    }

    if (next) {
      return next();
    }
  };
