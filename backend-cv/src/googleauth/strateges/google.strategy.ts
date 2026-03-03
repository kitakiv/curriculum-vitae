import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../auth/entities/user.entity';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { AuthService } from '../../auth/auth.service';
import googleOauthConfig from '../../config/google-oauth.config';
import { UserProvider } from '../../common/types/types';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectRepository(User)
    private readonly authService: AuthService,
    @Inject(googleOauthConfig.KEY) 
    private googleConfiguration: ConfigType<typeof googleOauthConfig>,
  ) {
    super({
      clientID: googleConfiguration.clientId,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackUrl,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = await this.authService.createOrUpdateGoogleUser({
      login: profile.emails[0].value,
      name: profile.name.givenName,
      password: null,
      avatarPhoto: profile.photos[0].value,
      googleId: profile.id,
      provider: UserProvider.GOOGLE,
      isEmailVerified: true
    });
    done(null, user);
  }
}