import { Redis } from "ioredis";

const redisConfig = {
  port: 6379,
  host: '127.0.0.1',
};

export class RedisInstance {
  static initRedis() {
    const redis = new Redis(redisConfig);
    redis.on('error', (err) => console.log('Redis cluster Error', err));
    return redis;
  }
}