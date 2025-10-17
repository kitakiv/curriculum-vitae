import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from 'src/variables/upload.variables';

@Injectable()
export class ProfileImageService {
  public name: string;
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {
    this.name = uploadVariables.profile.name;
  }
  async uploadImages({ id, images }: { id: string; images: string[] }) {
    const exist = await this.profileRepository.existsBy({ id });
    if (!exist) throw new BadRequestException(`Profile ${id} not found images`);
    await this.profileRepository.update(id, { profilePhotos: images });
    return { id, profilePhotos: images };
  }

  async getImageKey(id: string) {
    const profileId = id.split(`-`).slice(0, -1).join('-');
    const exist = await this.profileRepository.existsBy({ id: profileId });
    if (!exist)
      throw new BadRequestException(`Profile ${profileId} not found key`);
    const profile = await this.profileRepository.findOneBy({ id: profileId });
    if (profile.profilePhotos) {
      profile.profilePhotos.forEach((image) => {
        if (image.includes(id)) {
          return decodeURIComponent(image.split(`/`).at(-1));
        }
      });
    }
    return null;
  }

  async getImageKeys(profileId: string) {
    const exist = await this.profileRepository.existsBy({ id: profileId });
    if (!exist) throw new BadRequestException(`Profile ${profileId} not found`);
    const profile = await this.profileRepository.findOneBy({ id: profileId });
    if (profile.profilePhotos) {
      return profile.profilePhotos.map((image) => {
        return decodeURIComponent(image.split(`/`).at(-1));
      });
    }
    return null;
  }
}

