const MAX_FILE_IMAGES = Number(process.env.MAX_IMAGE_COUNT) || 10;
const KB = 1000;
const MB = KB * 1000 * 10 // 10 MB
const REFRESH_TOKEN_EXPIRATION_DAYS =
  Number(process.env.REFRESH_TOKEN_VALIDITY_DURATION_IN_DAYS) || 3;
const FILE_EXTENSIONS = ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp', 'svg+xml'];
const NANO_ID_LENGTH = 64;
const EXPIRE_DATE_RESET_TOKEN = 1 * 60 * 60 * 1000; // 1 hour
const EXPIRE_DATE_VERIFICATION_TOKEN = 24 * 60 * 60 * 1000; // 24 hours
const directives: Record<string, string[]> =  {
  imgSrc: [
    `'self'`,
    'data:',
    'apollo-server-landing-page.cdn.apollographql.com',
  ],
  scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
  manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
  frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
}

const RESETPASSWORD_URL = 'password/reset';
function expiryDate(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export {
  MAX_FILE_IMAGES,
  KB,
  MB,
  FILE_EXTENSIONS,
  REFRESH_TOKEN_EXPIRATION_DAYS,
  EXPIRE_DATE_VERIFICATION_TOKEN,
  NANO_ID_LENGTH,
  EXPIRE_DATE_RESET_TOKEN,
  RESETPASSWORD_URL,
  expiryDate,
  directives,
};
