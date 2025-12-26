import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CreateTechStackInput } from './dto/create-techstack.input';
import { UpdateTechStackInput } from './dto/update-techstack.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechStack } from './entities/techstack.entity';
import { errors } from '../errors/errors.config';
import uploadVariables from '../variables/upload.variables';
import { RedisCacheService } from '../cache/cache.service';

@Injectable()
export class TechStackService {
  private readonly TECHSTACK_CACHE_KEY = uploadVariables.techstack.cacheKey;
  private readonly TECHSTACK_CACHE_TIME = uploadVariables.techstack.cacheTime;
  constructor(
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
    private readonly logger: Logger = new Logger(TechStackService.name),
    private readonly redisCacheService: RedisCacheService,
  ) {}
  async create(createTechStackInput: CreateTechStackInput) {
    try {
      const techStack = await this.techStackRepository.create(
        new TechStack(createTechStackInput),
      );
      await this.techStackRepository.save(techStack);
      return techStack;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_CREATED('TechStack'));
    }
  }

  async findAll() {
    const techStack = await this.redisCacheService.get(
      this.TECHSTACK_CACHE_KEY,
    );
    if (techStack) return JSON.parse(techStack);
    const newTechStack = await this.techStackRepository.find();
    await this.redisCacheService.set(
      this.TECHSTACK_CACHE_KEY,
      JSON.stringify(newTechStack),
      this.TECHSTACK_CACHE_TIME,
    );
    return newTechStack;
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
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('TechStack'));
    }
  }
  async remove(id: string) {
    const exist = await this.techStackRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('TechStack'));
    try {
      await this.techStackRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_DELETED('TechStack'));
    }
    return { id };
  }
}
