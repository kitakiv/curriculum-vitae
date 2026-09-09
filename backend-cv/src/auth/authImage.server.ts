import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from '../variables/upload.variables';
import { errors } from '../errors/errors.config';
import { SingleImage, SingleImageBaseClass } from 'src/upload/interface/singleImage.abstract';
import { SingleImagesFromIds } from '../upload/interface/singleImage.abstract';
@Injectable()
export class UserImageService extends SingleImageBaseClass {
  public name: string;
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly logger: Logger = new Logger(UserImageService.name),
  ) {
    super();
    this.name = uploadVariables.user.name;
  }
  async uploadImage({ id, image }: { id: string; image: string }) {
    const exist = await this.usersRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('User'));
    try {
      await this.usersRepository.update(id, { avatarPhoto: image });
      return { id, userImage: image };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('User'));
    }
  }

  async getImageKey(id: string) {
    const exist = await this.usersRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('User'));
    const user = await this.usersRepository.findOneBy({ id });
    if (user.avatarPhoto) {
      return user.avatarPhoto;
    }
    return null;
  }

  async getImageKeys(ids: string[]): Promise<(SingleImagesFromIds)[]> {
    const users = await this.usersRepository.findBy({ id: In(ids) });
    if (users.length === 0) throw new NotFoundException(errors.NOT_FOUND('Users'));
    const imageKeys = users.reduce((acc: (SingleImagesFromIds)[], user) => {
      if (user.avatarPhoto) {
        acc.push({ resourceId: user.id, imageKey: user.avatarPhoto });
      }
      return acc;
    }, []);
    return imageKeys;
  }
}
