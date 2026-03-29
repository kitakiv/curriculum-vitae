import { REFRESH_TOKEN_EXPIRATION_DAYS } from '../common/constants';

export const cookieConfig = {
  accessToken: {
    name: 'access_token',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:
        Number(process.env.ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC) ||
        15 * 60 * 60 * 1000,
      path: '/',
    },
  },
  refreshToken: {
    name: 'refresh_token',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_EXPIRATION_DAYS * 24 * 60 * 60 * 1000,
      path: '/',
    },
  },
};
