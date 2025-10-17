import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TechStack } from './entities/techstack.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from 'src/variables/upload.variables';

@Injectable()
export class TechStackImageService {
  public name: string;
  constructor(
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
  ) {
    this.name = uploadVariables.techstack.name;
  }
  async uploadImage({ id, image }: { id: string; image: string }) {
    const exist = await this.techStackRepository.existsBy({ id });
    if (!exist) throw new BadRequestException('TechStack not found');
    await this.techStackRepository.update(id, { techSvg: image });
    return { id, techSvg: image };
  }

  async getImageKey(id: string) {
    const exist = await this.techStackRepository.existsBy({ id });
    if (!exist) throw new BadRequestException('TechStack not found');
    const techStack = await this.techStackRepository.findOneBy({ id });
    if (techStack.techSvg) {
      return decodeURIComponent(techStack.techSvg.split(`/`).at(-1));
    }
    return null;
  }
}

