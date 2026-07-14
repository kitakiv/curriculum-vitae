import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ConsoleLogger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { directives } from './common/constants';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger(
      JSON.stringify({
        json: true,
        colorize: true,
        timestamp: true,
        prettyPrint: true,
      }),
    ),
  });
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: process.env.FRONTEND_URL?.split(',').map(url => url.trim()),
    credentials: true,
  });
  app.use(cookieParser());
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
