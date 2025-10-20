import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Logger } from '@nestjs/common';
import { IS_PERMISSION_KEY } from 'src/decorators/permissoin.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly logger = new Logger(AuthorizationGuard.name);
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
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

    const requiredRoutePermissions = this.reflector.getAllAndOverride<boolean>(
      IS_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
