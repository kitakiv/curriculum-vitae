// src/middleware/http-logger.middleware.ts
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, ip } = req;
    const startTime = Date.now();
    const date = new Date().toISOString();

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;
      const hasErrors = statusCode >= 400;

      const logData = {
        ip,
        duration: `${duration}ms`,
        date,
        method,
        url,
        result: statusCode,
      };

      if (hasErrors) {
        this.logger.error(logData);
      } else {
        this.logger.log(logData);
      }
    });

    next();
  }
}
