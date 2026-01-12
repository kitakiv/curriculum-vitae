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

  private filterSensitiveData(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.filterSensitiveData(item));
    };
    if (!obj || typeof obj !== 'object') return obj;
    const filtered = { ...obj };
    const sensitiveFields = ['password', 'refreshToken', 'secretKey', 'token'];
    for (const key in filtered) {
      if (sensitiveFields.includes(key)) {
        delete filtered[key];
      } else if (typeof filtered[key] === 'object') {
        filtered[key] = this.filterSensitiveData(filtered[key]);
      }
    }
    return filtered;
  }
}
