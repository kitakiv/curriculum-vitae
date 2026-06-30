import { Module } from '@nestjs/common';
import { GoogleauthController } from './googleauth.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strateges/google.strategy';
import { AuthModule } from 'src/auth/auth.module';
import googleOauthConfig from 'src/config/google-oauth.config';

@Module({
  controllers: [GoogleauthController],
  providers: [GoogleStrategy],
  imports: [
    ConfigModule.forFeature(googleOauthConfig),
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
})
export class GoogleauthModule {}
