import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisClient
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: Redis;
  private expire: number;
  constructor(private configService: ConfigService) {}
  onApplicationBootstrap() {
    this.redisClient = new Redis({
      host: this.configService.get('redis.host'),
      port: this.configService.get('redis.port'),
      password: this.configService.get('redis.pwd'),
    });
    this.expire = this.configService.get('redis.expire');
  }

  onApplicationShutdown(signal?: string) {
    console.log('signal :>> ', signal);
    throw new Error('Method not implemented.');
  }

  async set(key: any, value: any): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async setExpire(key: any, value: any, expire?: number): Promise<void> {
    await this.redisClient.set(key, value);
    if (!expire) {
      expire = this.expire;
    }
    await this.redisClient.expire(key, expire);
  }

  async getValue(key: any): Promise<any> {
    return await this.redisClient.get(key);
  }

  async del(key: any): Promise<any> {
    return await this.redisClient.del(key);
  }
}
