import { registerAs } from '@nestjs/config';

export default registerAs('emailNoreply', () => ({
  emailHost: process.env.EMAIL_HOST,
  emailPort: Number(process.env.EMAIL_PORT),
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  emailFrom: process.env.EMAIL_FROM,
  backendUrl: process.env.BACKEND_URL,
  frontendUrl: process.env.FRONTEND_URL
}));