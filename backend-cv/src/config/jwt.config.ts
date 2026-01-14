import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtOptions: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: parseInt(
        configService.getOrThrow<string>(
          'ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC',
        ),
      ),
    },
  }),
  global: true,
  inject: [ConfigService],
};
