import { Logger, Module } from '@nestjs/common';
import { TechStackService } from './techstack.service';
import { TechStackResolver } from './techstack.resolver';
import { TechStack } from './entities/techstack.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechStackImageService } from './tachstackImage.service';
import { S3Service } from '../s3/s3.service';
import { AuthModule } from '../auth/auth.module';
import { RedisCacheModule } from '../cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TechStack]),
    AuthModule,
    RedisCacheModule,
  ],
  providers: [
    TechStackResolver,
    TechStackService,
    TechStackImageService,
    S3Service,
    Logger
  ],
  exports: [TypeOrmModule.forFeature([TechStack])]
})
export class TechStackModule {}
