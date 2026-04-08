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
import { MultiImageBaseClass } from 'src/upload/interface/multiImage.abstract';

@Injectable()
export class ProfileImageService extends MultiImageBaseClass {
  public name: string;
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly logger: Logger = new Logger(ProfileImageService.name),
  ) {
    super();
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
    previousImageId,
    url,
  }: {
    id: string;
    previousImageId: string;
    url: string;
  }) {
    const profile = await this.profileRepository.findOneBy({ id });
    if (!profile) throw new NotFoundException(errors.NOT_FOUND('Profile'));
    const images = profile.profilePhotos || [];
    const updatedImages = images.map(
      (image) => {
        if (image.includes(previousImageId)) { // instead of previousImageId push new url
          return url;
        }
        return image;
      }
    );
    try {
      await this.profileRepository.update(id, { profilePhotos: updatedImages });
      return { id, profilePhotos: updatedImages };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Profile'));
    }
  }

   async uploadImage({ id, url }: { id: string; url: string }) {
    const project = await this.profileRepository.findOneBy({ id });
    if (!project) throw new NotFoundException(errors.NOT_FOUND('Project'));
    try {
      const profilePhotos = project.profilePhotos || [];
      profilePhotos.push(url);
      await this.profileRepository.update(id, {profilePhotos: profilePhotos});
      return { id, profilePhotos: profilePhotos };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Profile'));
    }
  }

  async deleteImageIndex({
    id,
    imageId,
  }: {
    id: string;
    imageId: string;
  }) {
    const profile = await this.profileRepository.findOneBy({ id });
    if (!profile) throw new NotFoundException(errors.NOT_FOUND('Profile'));
    const images = profile.profilePhotos || [];
    const updatedImages = images.filter((image) => !image.includes(imageId));
    try {
      await this.profileRepository.update(id, { profilePhotos: updatedImages });
      return { id, profilePhotos: updatedImages };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Profile'));
    }
  }

  async getImageKey(resourceId: string, imageId: string) {
    const profile = await this.profileRepository.findOneBy({ id: resourceId });
    if (!profile) throw new NotFoundException(errors.NOT_FOUND('Profile'));
    if (profile.profilePhotos) {
      const foundImage = profile.profilePhotos.find((image) =>
        image.includes(imageId),
      );
      if (foundImage) {
        return foundImage;
      }
    }
    return null;
  }

  async getImageKeys(resourceId: string) {
    const profile = await this.profileRepository.findOneBy({ id: resourceId });
    if (!profile) throw new NotFoundException(errors.NOT_FOUND('Profile'));
    if (profile.profilePhotos) {
      return profile.profilePhotos
    }
    return null;
  }
}
