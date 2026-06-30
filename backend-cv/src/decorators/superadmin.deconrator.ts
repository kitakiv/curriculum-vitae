import { SetMetadata } from '@nestjs/common';
import { CreatePermissionInput } from '../roles/dto/create-role.input';


export const IS_SUPERADMIN_KEY = 'superadmin';
export const SuperAdmin = () =>
  SetMetadata(IS_SUPERADMIN_KEY, true);
