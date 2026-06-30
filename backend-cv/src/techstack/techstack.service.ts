import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CreateTechStackInput } from './dto/create-techstack.input';
import { UpdateTechStackInput } from './dto/update-techstack.input';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { TechStack } from './entities/techstack.entity';
import { errors } from '../errors/errors.config';
import uploadVariables from '../variables/upload.variables';
import { RedisCacheService } from '../cache/cache.service';
import { Project } from '../projects/entities/project.entity';
import { DataSource } from 'typeorm';
import { TechCategory } from '../tech-category/entities/tech-category.entity';

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
    @InjectRepository(TechCategory)
    private readonly techCategoryRepository: Repository<TechCategory>,
    private readonly logger: Logger = new Logger(TechStackService.name),
    private readonly redisCacheService: RedisCacheService,
  ) { }

   private async deleteCache() {
    await this.redisCacheService.del(this.TECHSTACK_CACHE_KEY);
  }
  async create(createTechStackInput: CreateTechStackInput) {
    const projects = await this.checkEntitiesExistence(
      this.projectRepository,
      createTechStackInput.projects,
      'Projects',
    );
    const techCategories = await this.checkEntitiesExistence(
      this.techCategoryRepository,
      createTechStackInput.techCategories,
      'TechCategories',
    );
    try {
      const createdTechStack = await this.dataSource.transaction(async (manager) => {
        const techStack = await manager.create(TechStack, {
          ...createTechStackInput,
          projects,
          techCategories,
        });
        await manager.save(TechStack, techStack);
        return techStack;
      });
      await this.deleteCache();
      return createdTechStack;
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
        techCategories: true,
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
        techCategories: true,
      },
    });
  }

  async findAllProjects(id: string): Promise<Project[]> {
    const projects = await this.projectRepository.find({
      where: {
        techStacks: {
          id,
        },
      },
    })
    return projects;
  }

  async findAllCategories(id: string): Promise<TechCategory[]> {
    const categories = await this.techCategoryRepository.find({
      where: {
        techStacks: {
          id,
        },
      },
    });
    return categories;
  }
  async update(
    id: string,
    updateTechStackInput: UpdateTechStackInput,
  ): Promise<TechStack | NotFoundException | BadRequestException> {
    const techStack = await this.findOne(id);
    if (!techStack)
      throw new NotFoundException(errors.NOT_FOUND(`TechStack ${id}`));
    const projects = Array.isArray(updateTechStackInput.projects)
      ? await this.checkEntitiesExistence(
        this.projectRepository,
        updateTechStackInput.projects,
        'Projects',
      )
      : (techStack as TechStack).projects;
    const techCategories = (Array.isArray(updateTechStackInput.techCategories)
      ? await this.checkEntitiesExistence(
        this.techCategoryRepository,
        updateTechStackInput.techCategories,
        'TechCategories',
      )
      : (techStack as TechStack).techCategories)
    try {
      const updatedTechStack = await this.dataSource.transaction(async (manager) => {
        const preloadedTechStack = await manager.preload(TechStack, {
          id,
          ...updateTechStackInput,
          projects,
          techCategories
        });
        await manager.save(preloadedTechStack);
        return preloadedTechStack as TechStack;
      });
      await this.deleteCache();
      return updatedTechStack;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('TechStack'));
    }
  }

  private async checkEntitiesExistence<T extends { id: string }>(
    repository: Repository<T>,
    ids: string[] = [],
    name: string,
  ): Promise<T[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    const { entities, notFoundIds } = await this.getEntitesByIds(
      repository,
      ids,
    );
    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        errors.NOT_FOUND(`${name} (${notFoundIds.join(', ')})`),
      );
    }
    return entities;
  }

  private async getEntitesByIds<T extends { id: string }>(
    repository: Repository<T>,
    ids: string[],
  ): Promise<{ entities: T[]; notFoundIds: string[] }> {
    const uniqueIds = [...new Set(ids)];
    const entities = await repository.find({
      where: {
        id: In(uniqueIds),
      } as FindOptionsWhere<T>,
    });
    const notFoundIds = ids.filter(
      (id) => !entities.find((entity: T) => entity.id === id),
    );
    return { entities, notFoundIds };
  }
  async remove(
    id: string,
  ): Promise<{ id: string } | NotFoundException | BadRequestException> {
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
          .from('tech_stack_tech_categories_tech_category')
          .where('techStackId = :id', { id })
          .execute();
        await manager
          .createQueryBuilder()
          .delete()
          .from('tech_stack')
          .where('id = :id', { id })
          .execute();
      });
      await this.deleteCache(); 
      return { id };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_DELETED('TechStack'));
    }
  }
}
