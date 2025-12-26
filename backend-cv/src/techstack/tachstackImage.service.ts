import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { TechStack } from './entities/techstack.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from '../variables/upload.variables';
import { errors } from '../errors/errors.config';

@Injectable()
export class TechStackImageService {
  public name: string;
  constructor(
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
    private readonly logger: Logger = new Logger(TechStackImageService.name),
  ) {
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
      return decodeURIComponent(techStack.techSvg.split(`/`).at(-1));
    }
    return null;
  }
}

