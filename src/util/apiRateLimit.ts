import {redisClient} from '../services/redisClient';

async function apiRateLimit(key: string | undefined, limit = 150): Promise<boolean> {
  if (!key) return false;

  let numOfRequests: number;
  try {
    numOfRequests = await redisClient.incr(key);
  } catch (error) {
    return true;
  }

  if (numOfRequests > limit) return true;

  redisClient.expire(key, 10);
  return false;
}

export default apiRateLimit;
