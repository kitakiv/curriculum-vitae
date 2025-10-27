import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, ip } = req;
    const requestTime = new Date().getTime();
    res.on('finish', () => {
      const responseTime = new Date().getTime();
      const duration = responseTime - requestTime;
      this.logger.log(`${method} ${url} ${ip} ${duration}ms`);
    });
    next();

  }
}