import { ThrottlerAsyncOptions } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const throttlerOptions: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => [
    {
      ttl: Number(config.get('THROTTLE_TTL')),
      limit: Number(config.get('THROTTLE_LIMIT')),
    },
  ],
};
