import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object') {
          return this.filterSensitiveData(data);
        }
        return data;
      }),
    );
  }

  private filterSensitiveData(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.filterSensitiveData(item));
    }

    if (data && typeof data === 'object') {
      const filtered = { ...data };
      delete filtered.password;
      delete filtered.secretKey;
      return filtered;
    }

    return data;
  }
}
