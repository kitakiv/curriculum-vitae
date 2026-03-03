import { registerAs } from '@nestjs/config';

export default registerAs('googleOAuth', () => ({
  clientId: process.env.CLIENT_GOOGLE_ID,
  clientSecret: process.env.CLIENT_GOOGLE_SECRET,
  callbackUrl: process.env.CLIENT_GOOGLE_CALLBACK,
}));