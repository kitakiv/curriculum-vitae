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

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly logger = new Logger(AuthorizationGuard.name);
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoutePermissions = this.reflector.getAllAndOverride(
      IS_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoutePermissions) {
      return true;
    }
    const ctxType = context.getType<'graphql' | 'http'>();
    let request: Request;
    if (ctxType === 'graphql') {
      const gqlCtx = GqlExecutionContext.create(context);
      const ctx = gqlCtx.getContext();
      // GraphQL context
      request = ctx.req;
    } else if (ctxType === 'http') {
      // HTTP context
      request = context.switchToHttp().getRequest();
    } else {
      // another context
      return false;
    }
    if (!request['userId']) {
      throw new UnauthorizedException('User ID not found');
    }
    try {
      const haveUserRequiredPermissions =
        await this.authService.canActivateCurrentPermissions(
          request['userId'],
          requiredRoutePermissions,
        );
      return haveUserRequiredPermissions;
    } catch (error) {
      this.logger.error(error.message);
      throw new ForbiddenException(error.message);
    }
  }
}
