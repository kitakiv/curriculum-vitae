import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateProfileInput } from './dto/update-profile.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { errors } from '../errors/errors.config';

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
    try {
      let profile = await this.profileRepository.findOneBy({});
      if (!profile) {
        profile = await this.createDefaultProfile(); // Assign the created profile
      }
      await this.profileRepository.update(profile.id, {
        name: profile.name,
        ...updateProfileInput,
      });
      return await this.profileRepository.findOneBy({ id: profile.id });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_UPDATED('Profile'), {
        cause: error,
      });
    }
  }

  async createDefaultProfile() {
    const profile = new Profile({});
    const createdProfile = await this.profileRepository.create(profile);
    await this.profileRepository.save(createdProfile);
    return createdProfile;
  }
}
