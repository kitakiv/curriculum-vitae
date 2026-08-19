import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { TechStack } from './entities/techstack.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from '../variables/upload.variables';
import { errors } from '../errors/errors.config';
import { SingleImage, SingleImageBaseClass } from 'src/upload/interface/singleImage.abstract';
import { SingleImagesFromIds } from '../upload/interface/singleImage.abstract';

@Injectable()
export class TechStackImageService extends SingleImageBaseClass {
  public name: string;
  constructor(
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
    private readonly logger: Logger = new Logger(TechStackImageService.name),
  ) {
    super();
    this.name = uploadVariables.techstack.name;
  }
  async uploadImage({ id, image }: { id: string; image: string }) {
    const exist = await this.techStackRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('TechStack'));
    try {
      await this.techStackRepository.update(id, { techSvg: image });
      return { id, techSvg: image };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('TechStack'));
    }
  }

  async getImageKey(id: string) {
    const exist = await this.techStackRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('TechStack'));
    const techStack = await this.techStackRepository.findOneBy({ id });
    if (techStack.techSvg) {
      return techStack.techSvg;
    }
    return null;
  }

  async getImageKeys(ids: string[]): Promise<(SingleImagesFromIds)[]> {
    const techStacks = await this.techStackRepository.findBy({ id: In(ids) });
    if (techStacks.length === 0) throw new NotFoundException(errors.NOT_FOUND('TechStacks'));
    const imageKeys = techStacks.reduce((acc: (SingleImagesFromIds)[], techStack) => {
      if (techStack.techSvg) {
        acc.push({ resourceId: techStack.id, imageKey: techStack.techSvg });
      }
      return acc;
    }, []);
    return imageKeys;
  }
}

