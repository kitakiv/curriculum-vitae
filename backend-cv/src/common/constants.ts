const MAX_FILE_IMAGES = Number(process.env.MAX_IMAGE_COUNT) || 10;
const KB = 1000;
const MB = KB * 1000;
const REFRESH_TOKEN_EXPIRATION_DAYS =
  Number(process.env.REFRESH_TOKEN_VALIDITY_DURATION_IN_DAYS) || 3;
const FILE_EXTENSIONS = ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp', 'svg+xml'];
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
const expiryDate = (days: number) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000);
export {
  MAX_FILE_IMAGES,
  KB,
  MB,
  FILE_EXTENSIONS,
  REFRESH_TOKEN_EXPIRATION_DAYS,
  expiryDate,
  directives,
};
