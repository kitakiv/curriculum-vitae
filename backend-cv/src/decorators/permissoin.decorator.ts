import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/roles/dto/create-role.input';


export const IS_PERMISSION_KEY = 'permissions';
export const PermissionDecorator = (permissions: Permission) =>
  SetMetadata(IS_PERMISSION_KEY, permissions);
