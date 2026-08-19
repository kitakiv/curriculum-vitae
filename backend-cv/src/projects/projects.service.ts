import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In, FindOptionsWhere } from 'typeorm';
import { TechStack } from '../techstack/entities/techstack.entity';
import { errors } from '../errors/errors.config';
import { RedisCacheService } from '../cache/cache.service';
import uploadVariables from '../variables/upload.variables';

@Injectable()
export class ProjectsService {
  private readonly PROJECT_CACHE_KEY = uploadVariables.projects.cacheKey;
  private readonly PROJECT_CACHE_TIME = uploadVariables.projects.cacheTime;
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
    private readonly logger: Logger = new Logger(ProjectsService.name),
    private readonly redisCacheService: RedisCacheService,
  ) { }

  private async deleteCache() {
    await this.redisCacheService.del(this.PROJECT_CACHE_KEY);
  }
  async create(
    createProjectInput: CreateProjectInput,
  ): Promise<Project | NotFoundException> {
    const entites = await this.checkEntitiesExistence(
      this.techStackRepository,
      createProjectInput.techStacks,
      'Tech stacks',
    );
    try {
      const createdProject = await this.dataSource.transaction(
        async (manager) => {
          const project = await manager.create(Project, {
            ...createProjectInput,
            techStacks: entites,
          });
          await manager.save(Project, project);
          return project;
        },
      );
      await this.deleteCache();
      return createdProject;
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(errors.NOT_CREATED('Project'));
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

  async findAll() {
    const cachedProjects = await this.redisCacheService.get(
      this.PROJECT_CACHE_KEY,
    );
    if (cachedProjects) {
      return JSON.parse(cachedProjects);
    }
    const projects = await this.projectsRepository.find();
    await this.redisCacheService.set(
      this.PROJECT_CACHE_KEY,
      JSON.stringify(projects),
      this.PROJECT_CACHE_TIME,
    );
    return projects;
  }

  async findOne(id: string) {
    const project = await this.projectsRepository.findOne({
      where: { id },
    });
    if (!project) throw new NotFoundException(errors.NOT_FOUND('Project'));
    return project;
  }

  async findAllTechStacks(id: string): Promise<TechStack[]> {
    const techStacks = await this.techStackRepository.find({
      where: {
        projects: {
          id,
        },
      },
    });
    return techStacks;
  }

  async update(id: string, updateProjectInput: UpdateProjectInput) {
    const project = await this.findOne(id);
    if (!project)
      throw new NotFoundException(errors.NOT_FOUND(`Project ${id}`));
    const techStacksEntities = (Array.isArray(updateProjectInput.techStacks))
      ? (await this.checkEntitiesExistence(
        this.techStackRepository,
        updateProjectInput.techStacks,
        'Tech stacks'))
      : project.techStacks;
    try {
      const updatedProject = await this.dataSource.transaction(async (manager) => {
        const updatedProject = await manager.preload(Project, {
          id,
          ...updateProjectInput,
          techStacks: techStacksEntities
        });
        await manager.save(Project, updatedProject);
        return updatedProject;
      });
      await this.deleteCache();
      return updatedProject;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Project'));
    }
  }
  async remove(
    id: string,
  ): Promise<{ id: string } | NotFoundException | BadRequestException> {
    const exist = await this.projectsRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Project'));
    try {
      await this.dataSource.transaction(async (manager) => {
        await manager
          .createQueryBuilder()
          .delete()
          .from('project_tech_stacks_tech_stack')
          .where('projectId = :id', { id })
          .execute();
        await manager
          .createQueryBuilder()
          .delete()
          .from('project')
          .where('id = :id', { id })
          .execute();
      });
      await this.deleteCache();
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_DELETED('Project'));
    }
    return { id };
  }

  async removeMany(ids: string[]): Promise<string[]> {
    const projects = await this.projectsRepository.findBy({ id: In(ids) });
    if (projects.length === 0)
      throw new NotFoundException(errors.NOT_FOUND('Projects'));
    if (projects.length !== ids.length) {
      const foundIds = projects.map((p) => p.id);
      const notFoundIds = ids.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(errors.NOT_FOUND('Project with id: ' + notFoundIds.join(', ')));
    }
    try {
      await this.dataSource.transaction(async (manager) => {
        await manager
          .createQueryBuilder()
          .delete()
          .from('project_tech_stacks_tech_stack')
          .where('projectId IN (:...ids)', { ids })
          .execute();
        await manager
          .createQueryBuilder()
          .delete()
          .from('project')
          .where('id IN (:...ids)', { ids })
          .execute();
      });
      await this.deleteCache();
      return ids;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_DELETED('Projects with ids: ' + ids.join(', ')));
    }
  }
}
