import { Injectable } from '@nestjs/common';
import { UpdateProfileInput } from './dto/update-profile.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async find() {
    const profile = await this.profileRepository.findOneBy({});
    if (!profile) {
      return await this.createDefaultProfile();
    }
    return profile;
  }


  async update(updateProfileInput: UpdateProfileInput) {
    const profile = await this.profileRepository.findOneBy({});
    if (!profile) {
      await this.createDefaultProfile();
    }
    console.log(profile.id);
    await this.profileRepository.update({ id: profile.id }, updateProfileInput);
    return await this.profileRepository.findOneBy({ id: profile.id });
  }

  async createDefaultProfile() {
    const profile = new Profile({});
    const createdProfile = await this.profileRepository.create(profile);
    await this.profileRepository.save(createdProfile);
    return createdProfile;
  }
}
