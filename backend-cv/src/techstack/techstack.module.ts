import { Module } from '@nestjs/common';
import { TechStackService } from './techstack.service';
import { TechStackResolver } from './techstack.resolver';
import { TechStack } from './entities/techstack.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechStackImageService } from './tachstackImage.service';
import { S3Service } from 'src/s3/s3.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TechStack]), AuthModule],
  providers: [
    TechStackResolver,
    TechStackService,
    TechStackImageService,
    S3Service,
  ],
  exports: [TypeOrmModule.forFeature([TechStack])]
})
export class TechStackModule {}
