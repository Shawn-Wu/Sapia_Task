import { Redis } from "ioredis";

export class RedisInstance {
  static initRedis() {
    const redis = new Redis({
      port: parseInt(process.env.Redis_Port, 10) || 6379,
      host: process.env.Redis_Host,
    });
    redis.on('error', (err) => console.log('Redis cluster Error', err));
    return redis;
  }
}