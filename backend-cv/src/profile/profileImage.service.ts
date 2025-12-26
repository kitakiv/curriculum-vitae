import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from '../variables/upload.variables';
import { errors } from '../errors/errors.config';
import { Logger } from '@nestjs/common';

@Injectable()
export class ProfileImageService {
  public name: string;
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly logger: Logger = new Logger(ProfileImageService.name),
  ) {
    this.name = uploadVariables.profile.name;
  }
  async uploadImages({ id, images }: { id: string; images: string[] }) {
    const exist = await this.profileRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Profile'));
    try {
      await this.profileRepository.update(id, { profilePhotos: images });
      return { id, profilePhotos: images };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Profile'));
    }
  }

  async uploadImageIndex({
    id,
    index,
    url,
  }: {
    id: string;
    index: number;
    url: string;
  }) {
    const profile = await this.profileRepository.findOneBy({ id });
    if (!profile) throw new NotFoundException(errors.NOT_FOUND('Profile'));
    const images = profile.profilePhotos || [];
    const filterImages = images.filter(
      (image) => !image.includes(`${id}-${index}`),
    );
    filterImages.push(url);
    try {
      await this.profileRepository.update(id, { profilePhotos: filterImages });
      return { id, profilePhotos: filterImages };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Profile'));
    }
  }

  async getImageKey(id: string) {
    const profileId = id.split(`-`).slice(0, -1).join('-');
    const exist = await this.profileRepository.existsBy({ id: profileId });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Profile'));
    const profile = await this.profileRepository.findOneBy({ id: profileId });
    if (profile.profilePhotos) {
      const foundImage = profile.profilePhotos.find((image) =>
        image.includes(id),
      );
      if (foundImage) {
        return decodeURIComponent(foundImage.split(`/`).at(-1));
      }
    }
    return null;
  }

  async getImageKeys(profileId: string) {
    const exist = await this.profileRepository.existsBy({ id: profileId });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Profile'));
    const profile = await this.profileRepository.findOneBy({ id: profileId });
    if (profile.profilePhotos) {
      return profile.profilePhotos.map((image) => {
        return decodeURIComponent(image.split(`/`).at(-1));
      });
    }
    return null;
  }
}
