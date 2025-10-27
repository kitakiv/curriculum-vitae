import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('Before...');
    // todo if graphql data null return only the error
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => {
        this.logger.log(`After... ${Date.now() - now}ms`);
      }));
  }
}