import { Logger, Module } from '@nestjs/common';
import { S3Service } from './s3.service';

@Module({
  providers: [S3Service, Logger],
})
export class S3Module {}
