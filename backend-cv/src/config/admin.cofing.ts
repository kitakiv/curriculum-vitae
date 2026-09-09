import { registerAs } from '@nestjs/config';

export default registerAs('adminConfig', () => ({
    adminEmail: process.env.ADMIN_LOGIN,
    adminPassword: process.env.ADMIN_PASSWORD,
    backendUrl: process.env.BACKEND_URL,
}));