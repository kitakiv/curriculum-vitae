import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refreshToken.entity';
import { Role } from '../roles/entities/role.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken, Role]), CommonModule],
  providers: [AuthResolver, AuthService, Logger],
  exports: [AuthService],
})
export class AuthModule {}
