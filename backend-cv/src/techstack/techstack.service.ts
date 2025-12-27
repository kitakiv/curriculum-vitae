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
import { Project } from '../projects/entities/project.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class TechStackService {
  private readonly TECHSTACK_CACHE_KEY = uploadVariables.techstack.cacheKey;
  private readonly TECHSTACK_CACHE_TIME = uploadVariables.techstack.cacheTime;
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly logger: Logger = new Logger(TechStackService.name),
    private readonly redisCacheService: RedisCacheService,
  ) {}
  async create(createTechStackInput: CreateTechStackInput) {
    const projects = createTechStackInput.projects || [];
    const projectsInstances = projects.map(async (id) => {
      const project = await this.projectRepository.findOneBy({ id });
      if (!project) throw new NotFoundException(errors.NOT_FOUND('Project'));
      return project;
    });
    try {
      const techStack = this.techStackRepository.create({
        ...createTechStackInput,
        projects: await Promise.all(projectsInstances),
      });
      return await this.techStackRepository.save(techStack);
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
    const newTechStack = await this.techStackRepository.find({
      relations: {
        projects: true,
      },
    });
    await this.redisCacheService.set(
      this.TECHSTACK_CACHE_KEY,
      JSON.stringify(newTechStack),
      this.TECHSTACK_CACHE_TIME,
    );
    return newTechStack;
  }

  async findOne(id: string): Promise<TechStack | NotFoundException> {
    const exist = await this.techStackRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('TechStack'));
    return await this.techStackRepository.findOne({
      where: { id },
      relations: {
        projects: true,
      },
    });
  }

  async update(
    id: string,
    updateTechStackInput: UpdateTechStackInput,
  ): Promise<TechStack | NotFoundException | BadRequestException> {
    const techStack = await this.techStackRepository.findOne({
      where: { id },
      relations: {
        projects: true,
      }
    });
    if (!techStack) throw new NotFoundException(errors.NOT_FOUND('TechStack'));
    if (!updateTechStackInput.projects) {
      try {
        await this.techStackRepository.update(id, {
          ...updateTechStackInput,
          projects: techStack.projects,
        });
        return await this.findOne(id);
      } catch (error) {
        this.logger.error(error);
        throw new BadRequestException(errors.NOT_UPDATED('TechStack'));
      }
    }
    const projects = updateTechStackInput.projects.map(async (id) => {
      const project = await this.projectRepository.findOneBy({ id });
      if (!project) throw new NotFoundException(errors.NOT_FOUND('Project'));
      return project;
    })
    try {
      await this.techStackRepository.update(id, {
        ...updateTechStackInput,
        projects: await Promise.all(projects),
      });
      return await this.findOne(id);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('TechStack'));
    }
  }
  async remove(
    id: string,
  ): Promise<void | NotFoundException | BadRequestException> {
    const exist = await this.techStackRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('TechStack'));
    try {
      await this.dataSource.transaction(async (manager) => {
        await manager
          .createQueryBuilder()
          .delete()
          .from('project_tech_stacks_tech_stack')
          .where('techStackId = :id', { id })
          .execute();
        await manager
          .createQueryBuilder()
          .delete()
          .from('tech_stack')
          .where('id = :id', { id })
          .execute();
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_DELETED('TechStack'));
    }
  }
}
