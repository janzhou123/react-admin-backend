import { Injectable, Logger } from '@nestjs/common';
import { RedisClient } from '../../../common/utils/redis-client';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(private readonly redisClient: RedisClient) {}

  async insertAccessToken(userId: string, tokenId: string): Promise<void> {
    await this.redisClient.setExpire(tokenId, userId);
    await this.redisClient.setExpire(userId, tokenId);
  }

  async invalidate(key: any): Promise<void> {
    await this.redisClient.del(key);
  }

  async getValue(key: any): Promise<any> {
    return await this.redisClient.getValue(key);
  }
}
