import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key): Promise<string> {
    return await this.cache.get(key);
  }

  async getMany(keys: string[]): Promise<string[]> {
    return await this.cache.mget(keys);
  }

  async set(key, value, ttl?: number) {
    await this.cache.set(key, value, ttl);
  }

  async del(key) {
    await this.cache.del(key);
  }
}