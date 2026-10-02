import { Logger, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from './email.controller';
import emailNoreplyConfig from '../config/email.config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import adminConfig from '../config/admin.cofing';
import { VerificationToken } from '../auth/entities/verificationToken.entity';

@Module({
  providers: [EmailService, Logger],
  exports: [EmailService],
  imports: [
    ConfigModule.forFeature(emailNoreplyConfig),
    ConfigModule.forFeature(adminConfig),
    TypeOrmModule.forFeature([User, VerificationToken]),
  ],
  controllers: [EmailController],
})
export class EmailModule {}

