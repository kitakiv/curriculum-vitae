import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { ProfilePhoto } from './entities/profilePhoto.entity';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProfilePhoto, Profile])],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
