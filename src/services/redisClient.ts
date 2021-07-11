import RedisClass, {Redis} from 'ioredis';
import environment from '../config/environment';

const {host, password, port} = environment.redis;

let redisClient: Redis;

const connectRedis = (): Promise<string> => {
  redisClient = new RedisClass({
    port,
    password,
    host,
    showFriendlyErrorStack: true,
  });

  return new Promise(resolve => {
    redisClient.on('connect', function () {
      resolve('Redis state: connected');
    });
  });
};

export {redisClient, connectRedis};
