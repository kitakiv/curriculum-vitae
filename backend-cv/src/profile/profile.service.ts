import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateProfileInput } from './dto/update-profile.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { DataSource, Repository } from 'typeorm';
import { errors } from '../errors/errors.config';
import { Logger } from '@nestjs/common';
import uploadVariables from '../variables/upload.variables';
import { RedisCacheService } from '../cache/cache.service';

@Injectable()
export class ProfileService {
  private readonly PROFILE_CACHE_KEY = uploadVariables.profile.cacheKey;
  private readonly PROFILE_CACHE_TIME = uploadVariables.profile.cacheTime;
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly logger: Logger = new Logger(ProfileService.name),
    private readonly cacheManager: RedisCacheService,
    private readonly dataSource: DataSource
  ) {}

  async find() {
    const cache = await this.cacheManager.get(this.PROFILE_CACHE_KEY);
    if (cache) {
      return cache;
    }
    let profile = await this.profileRepository.findOneBy({});
    if (!profile) {
      try {
        profile = await this.createDefaultProfile();
      } catch (error) {
        this.logger.error(error);
        throw new BadRequestException(errors.NOT_CREATED('Profile'));
      }
    }
    await this.cacheManager.set(
      this.PROFILE_CACHE_KEY,
      profile,
      this.PROFILE_CACHE_TIME,
    );
    return profile;
  }

  async update(updateProfileInput: UpdateProfileInput) {
    try {
      let profile = await this.profileRepository.findOneBy({});
      if (!profile) {
        profile = await this.createDefaultProfile(); // Assign the created profile
      }
      if (Object.keys(updateProfileInput).length === 0) return profile;
      await this.profileRepository.update(profile.id, {
        ...updateProfileInput,
      });
      const updatedProfile = await this.profileRepository.findOneBy({
        id: profile.id,
      });
      await this.cacheManager.set(this.PROFILE_CACHE_KEY, updatedProfile);
      return updatedProfile;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Profile'));
    }
  }

  async createDefaultProfile() {
    const profile = new Profile({});
    try {
      return await this.dataSource.transaction(async (manager) => {
        const createdProfile = await manager.create(Profile, profile);
        await manager.save(Profile, createdProfile);
        return createdProfile;
      })
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_CREATED('Profile'));
    }
  }
}
