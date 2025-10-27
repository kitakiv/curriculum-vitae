import { SetMetadata } from '@nestjs/common';
import { CreatePermissionInput } from 'src/roles/dto/create-role.input';


export const IS_PERMISSION_KEY = 'permissions';
export const PermissionGuard = (permissions: CreatePermissionInput[]) =>
  SetMetadata(IS_PERMISSION_KEY, permissions);
