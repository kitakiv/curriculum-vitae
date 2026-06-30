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
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ProjectsModule } from './projects/projects.module';
import { ProfileModule } from './profile/profile.module';
import { UploadModule } from './upload/upload.module';
import { ContactsModule } from './contacts/contacts.module';
import { TechStackModule } from './techstack/techstack.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesModule } from './roles/roles.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { GqlThrottlerGuard } from './guards/rate.guard';
import { HttpLoggerMiddleware } from './middleware/upload.middleware';
import { LoggingInterceptor } from './interceptor/cutom.interceptor';
import { throttlerOptions } from './config/throttler.config';
import { RedisCacheModule } from './cache/cache.module';
import { jwtOptions } from './config/jwt.config';
import { graphqlOptions } from './config/graphql.config';
import { TechCategoryModule } from './tech-category/tech-category.module';
import { CertificateModule } from './certificate/certificate.module';
import { GoogleauthModule } from './googleauth/googleauth.module';
import { EmailModule } from './email/email.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync(jwtOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlOptions),
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
    TechCategoryModule,
    CertificateModule,
    GoogleauthModule,
    EmailModule,
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
    },
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