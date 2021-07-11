import {Request} from 'express';

export const clientIp = (req: Request) => req.header('x-forwarded-for') || req['connection']?.['remoteAddress'] || '';
