import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    return {
      stores: [
        new KeyvRedis(
          `redis://:${
            config.get('REDIS_PASSWORD') || ''
          }@${config.get('REDIS_HOST')}:${config.get('REDIS_PORT')}`,
        ),
      ],
    };
  },
};
