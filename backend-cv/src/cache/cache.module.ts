import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisCacheService } from './cache.service';
import { RedisOptions } from 'src/config/cache.config';

@Module({
  imports: [CacheModule.registerAsync(RedisOptions)],
  providers: [RedisCacheService],
  exports: [RedisCacheService]
})
export class RedisCacheModule {}