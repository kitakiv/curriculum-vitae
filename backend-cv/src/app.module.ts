import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { SlidersModule } from './sliders/sliders.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProjectsModule } from './projects/projects.module';
import { ProfileModule } from './profile/profile.module';
import { UploadModule } from './upload/upload.module';
import { ContactsModule } from './contacts/contacts.module';
import { TechStackModule } from './techstack/techstack.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesModule } from './roles/roles.module';
import { GraphQLLoggerPlugin } from './middleware/custorm.middleware';
import { ThrottlerModule } from '@nestjs/throttler';
import { GqlThrottlerGuard } from './guards/rate.guard';
import { HttpLoggerMiddleware } from './middleware/upload.middleware';
import { LoggingInterceptor } from './interceptor/cutom.interceptor';
// import { RedisOptions } from './config/cache.config';
import { throttlerOptions } from './config/throttler.config';
import { RedisCacheModule } from './cache/cache.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
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
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      sortSchema: true,
      playground: true,
      plugins: [new GraphQLLoggerPlugin(new Logger())],
      context: ({ req, res }) => ({ req, res }),
      formatError: (error) => {
        if (process.env.NODE_ENV === 'production') {
          return {
            message: error.message,
            code: error.extensions?.code,
          };
        }
        return error;
      },
    }),
    ThrottlerModule.forRootAsync(throttlerOptions),
    DatabaseModule,
    RedisCacheModule,
    SlidersModule,
    ProjectsModule,
    ProfileModule,
    UploadModule,
    ContactsModule,
    TechStackModule,
    AuthModule,
    RolesModule,
  ],
  providers: [
    Logger,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
})
export class AppModule implements NestModule {

  constructor(private readonly logger: Logger) {
    this.logger.log(`AppModule initialized`);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware)
      .forRoutes({ path: 'upload/*', method: RequestMethod.ALL });
  }
}