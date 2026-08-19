import { SetMetadata } from '@nestjs/common';



export const IS_SUPERADMIN_KEY = 'superadmin';
export const SuperAdmin = () =>
  SetMetadata(IS_SUPERADMIN_KEY, true);
