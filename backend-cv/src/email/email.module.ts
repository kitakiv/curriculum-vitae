import { Logger, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from './email.controller';
import emailNoreplyConfig from '../config/email.config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';

@Module({
  providers: [EmailService, Logger],
  exports: [EmailService],
  imports: [
    ConfigModule.forFeature(emailNoreplyConfig),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [EmailController],
})
export class EmailModule {}

