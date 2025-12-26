import { Logger, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RedisCacheModule } from 'src/cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), AuthModule, RedisCacheModule],
  providers: [ProfileResolver, ProfileService, Logger],
})
export class ProfileModule {}
