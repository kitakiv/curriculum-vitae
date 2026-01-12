import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { cookieConfig } from '../../config/cookie.config';

@Injectable()
export class CookiesService {
  setCookies(response: Response, data: string, key: string) {
    if (!cookieConfig[`${key}`].name || !cookieConfig[`${key}`].options) return;
    response.cookie(cookieConfig[`${key}`].name, data, cookieConfig[`${key}`]);
    console.log('cookie set', response.get('Set-Cookie'));
  }

  clearCookies(response: Response, key: string) {
    if (!cookieConfig[`${key}`].name || !cookieConfig[`${key}`].options) return;
    response.clearCookie(cookieConfig[`${key}`].name);
  }

  getCookie(request: Request, key: string) {
    const cookie = request.cookies[cookieConfig[`${key}`].name];
    console.log('cookie', cookie);
    return cookie;
  }
}
