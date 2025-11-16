export const cookieConfig = {
  accessToken: {
    name: 'access_token',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 15 * 60 * 1000, // 15 minutes
      path: '/',
    },
  },
  refreshToken: {
    name: 'refresh_token',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    },
  },
};
