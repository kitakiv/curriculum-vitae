import { ThrottlerAsyncOptions } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';

export const throttlerOptions: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    throttlers: [
      {
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      },
    ],
    storage: new ThrottlerStorageRedisService(
      `redis://:${
        config.get('REDIS_PASSWORD') || ''
      }@${config.get('REDIS_HOST')}:${config.get('REDIS_PORT')}`,
    ),
  }),
};
