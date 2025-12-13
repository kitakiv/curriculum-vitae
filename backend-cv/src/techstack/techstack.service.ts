import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTechStackInput } from './dto/create-techstack.input';
import { UpdateTechStackInput } from './dto/update-techstack.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechStack } from './entities/techstack.entity';
import { errors } from '../errors/errors.config';

@Injectable()
export class TechStackService {
  constructor(
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
  ) {}
  async create(createTechStackInput: CreateTechStackInput) {
    try {
      const techStack = await this.techStackRepository.create(
        new TechStack(createTechStackInput),
      );
      await this.techStackRepository.save(techStack);
      return techStack;
    } catch (error) {
      throw new BadRequestException(errors.NOT_CREATED('TechStack'), {
        cause: error,
      });
    }
  }

  async findAll() {
    return await this.techStackRepository.find();
  }

  async findOne(id: string) {
    const exist = await this.techStackRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('TechStack'));
    return await this.techStackRepository.findOneBy({ id });
  }

  async update(id: string, updateTechStackInput: UpdateTechStackInput) {
    const exist = await this.techStackRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('TechStack'));
    try {
      await this.techStackRepository.update(id, updateTechStackInput);
      return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException(errors.NOT_UPDATED('TechStack'), {
        cause: error,
      });
    }
  }
  async remove(id: string) {
    const exist = await this.techStackRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('TechStack'));
    await this.techStackRepository.delete(id);
    return { id };
  }
}
