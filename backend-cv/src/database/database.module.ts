import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: configService.getOrThrow('MYSQL_PORT'),
        username: configService.getOrThrow('MYSQL_ROOT_USERNAME'),
        password: configService.getOrThrow('MYSQL_ROOT_PASSWORD'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        synchronize: JSON.parse(configService.getOrThrow('MYSQL_SYNCHRONIZE')),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
