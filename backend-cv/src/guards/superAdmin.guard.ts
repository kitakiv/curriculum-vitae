import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Logger } from '@nestjs/common';
import { IS_PERMISSION_KEY } from '../decorators/permission.decorator';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth/auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { IS_SUPERADMIN_KEY } from 'src/decorators/superadmin.deconrator';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  private readonly logger = new Logger(SuperAdminGuard.name);
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isSuperAdmin = this.reflector.getAllAndOverride<boolean>(IS_SUPERADMIN_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
    if (!isSuperAdmin) {
      return true;
    }
    const ctxType = context.getType<'graphql' | 'http'>();
    let request: Request;
    if (ctxType === 'graphql') {
      const gqlCtx = GqlExecutionContext.create(context);
      const ctx = gqlCtx.getContext();
      // GraphQL context
      request = ctx.req;
      if (!request['userId']) {
      throw new UnauthorizedException('User ID not found');
      }
      const args = gqlCtx.getArgs();
      const adminUser = await this.authService.findOne(this.configService.get('ADMIN_LOGIN'));
      if (args.id === adminUser.id) {
          throw new ForbiddenException('Super admin cannot be updated or deleted');
      }
      const role = await this.authService.findAllRoles(adminUser.id);
      if (args.id === role.id) {
          throw new ForbiddenException('Super admin role cannot be updated or deleted');
      }

      if (args.updateUserInput) {
        const userId = request['userId'];
        if (userId === adminUser.id) {
            throw new ForbiddenException('Super admin cannot be updated or deleted');
        }
      }
      // user admin role cannot be attached
      if (args.attachRoleInput) {
          if (args.attachRoleInput.roleId === role.id) {
              throw new ForbiddenException('Super admin role cannot be attached to user');
          }
          if (args.attachRoleInput.userId === adminUser.id) {
              throw new ForbiddenException('This role cannot be attached to super admin');
          }
      }
      

      if (args.updateRoleInput) {
        if (args.updateRoleInput.id === role.id) {
            throw new ForbiddenException('Super admin role cannot be updated');
        }
      }

      if (args.deleteRoleInput) {
        if (args.deleteRoleInput.id === role.id) {
            throw new ForbiddenException('Super admin role cannot be deleted');
        }
      }
      return true;
    } else if (ctxType === 'http') {
      // HTTP context
      return false;
    } else {
      // another context
      return false;
    }
  }
}
