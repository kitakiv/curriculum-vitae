import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Logger } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
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
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.logger.error(JSON.stringify({ message: 'Token not found' }));
      throw new UnauthorizedException('Token not found');
    }
    try {
      const payload = this.jwtService.verify(token);
      request['userId'] = payload.userId;
    } catch (error) {
      this.logger.error(error.message);
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
