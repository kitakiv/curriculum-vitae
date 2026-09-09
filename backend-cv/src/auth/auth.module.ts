import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refreshToken.entity';
import { Role } from '../roles/entities/role.entity';
import { CommonModule } from '../common/common.module';
import { EmailModule } from '../email/email.module';
import { UserImageService } from './authImage.server';
import { S3Service } from '../s3/s3.service';
import { ResetToken } from './entities/resetToken.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken, Role, ResetToken]),
    CommonModule,
    EmailModule,
  ],
  providers: [AuthResolver, AuthService, Logger, UserImageService, S3Service],
  exports: [AuthService],
})
export class AuthModule { }
