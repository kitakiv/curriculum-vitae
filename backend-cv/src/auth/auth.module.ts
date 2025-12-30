import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refreshToken.entity';
import { Role } from '../roles/entities/role.entity';
import { Logger } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken, Role]),],
  providers: [AuthResolver, AuthService, Logger],
  exports: [AuthService],
})
export class AuthModule {}
