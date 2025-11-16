import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { cookieConfig } from '../config/cookie.config';

@Injectable()
export class CookieService {
  setTokens(response: Response, accessToken: string, refreshToken: string) {
    response.cookie(
      cookieConfig.accessToken.name,
      accessToken,
      cookieConfig.accessToken.options,
    );
    response.cookie(
      cookieConfig.refreshToken.name,
      refreshToken,
      cookieConfig.refreshToken.options,
    );
  }

  clearTokens(response: Response) {
    response.clearCookie(cookieConfig.accessToken.name);
    response.clearCookie(cookieConfig.refreshToken.name);
  }
}