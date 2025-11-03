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
      // GraphQL context
      request = context.getArgs()[2].req;
    } else {
      // HTTP context
      request = context.switchToHttp().getRequest();
    }
    if (!request['userId']) {
      throw new UnauthorizedException('User ID not found');
    }
    try {
      const userPermission = await this.authService.getUserPermissions(
        request['userId'],
      );
      console.log(requiredRoutePermissions);
      for (const routePermission of requiredRoutePermissions) {
        const userHasPermission = userPermission.find(
          (permission) => routePermission.resource === permission.resource,
        );
        console.log(userHasPermission);
        if (!userHasPermission) throw new ForbiddenException();

        const allActionsAvailable = routePermission.actions.every((action) => {
          return userHasPermission.actions.includes(action);
        });
        console.log(allActionsAvailable);
        if (!allActionsAvailable) throw new ForbiddenException();
      }
      return true;
    } catch (error) {
      this.logger.error(error.message);
      throw new ForbiddenException(error.message);
    }
  }
}
