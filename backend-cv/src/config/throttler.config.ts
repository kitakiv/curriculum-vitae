import { ThrottlerAsyncOptions } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';

export const throttlerOptions: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    throttlers: [
      {
        ttl: parseInt(config.get('THROTTLE_TTL') || '60', 10) * 1000,
        limit: parseInt(config.get('THROTTLE_LIMIT') || '5', 10),
      },
    ],
    storage: new ThrottlerStorageRedisService(
      `redis://:${
        config.get('REDIS_PASSWORD') || ''
      }@${config.get('REDIS_HOST')}:${config.get('REDIS_PORT')}`,
    ),
  }),
};
