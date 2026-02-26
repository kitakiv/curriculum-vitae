import { Logger, Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CertificateResolver } from './certificate.resolver';
import { Certificate } from './entities/certificate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RedisCacheModule } from '../cache/cache.module';
import { S3Service } from '../s3/s3.service';
import { CertificateImageService } from './certificateImage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Certificate]),
    AuthModule,
    RedisCacheModule,
  ],
  providers: [
    CertificateResolver,
    CertificateService,
    S3Service,
    CertificateImageService,
    Logger,
  ],
})
export class CertificateModule {}
