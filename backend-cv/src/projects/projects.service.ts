import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import {
  UpdateProjectInput,
  UpdateProjectInputDto,
} from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
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
  ) {}
  async create(
    createProjectInput: CreateProjectInput,
  ): Promise<Project | NotFoundException> {
    const { techStacks, notFoundTechStacks } = await this.getTechStacks(
      createProjectInput.techStacks,
    );
    if (notFoundTechStacks.length > 0) {
      throw new NotFoundException(
        errors.NOT_FOUND(`TechStacks (${notFoundTechStacks.join(', ')})`),
      );
    }
    try {
      const createdProject = await this.dataSource.transaction(
        async (manager) => {
          const project = await manager.create(Project, {
            ...createProjectInput,
            techStacks,
          });
          await manager.save(Project, project);
          return project;
        },
      );
      return createdProject;
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(errors.NOT_CREATED('Project'));
    }
  }

  async findAll() {
    const cachedProjects = await this.redisCacheService.get(
      this.PROJECT_CACHE_KEY,
    );
    if (cachedProjects) {
      return JSON.parse(cachedProjects);
    }
    const projects = await this.projectsRepository.find({
      relations: {
        techStacks: true,
      },
    });
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
      relations: {
        techStacks: true,
      },
    });
    if (!project) throw new NotFoundException(errors.NOT_FOUND('Project'));
    return project;
  }

  async update(id: string, updateProjectInput: UpdateProjectInput) {
    const project = await this.findOne(id);
    if (!project)
      throw new NotFoundException(errors.NOT_FOUND(`Project ${id}`));
    if (!updateProjectInput.techStacks) {
      try {
        // delete tech Stack form updateInput
        delete updateProjectInput.techStacks;
        const updatedInput = { ...updateProjectInput } as UpdateProjectInputDto;
        await this.projectsRepository.update(id, updatedInput);
        return await this.findOne(id);
      } catch (error) {
        this.logger.error(error);
        throw new BadRequestException(errors.NOT_UPDATED('Project'));
      }
    }
    const { techStacks, notFoundTechStacks } = await this.getTechStacks(
      updateProjectInput.techStacks,
    );
    if (notFoundTechStacks.length > 0) {
      throw new NotFoundException(
        errors.NOT_FOUND(`TechStacks (${notFoundTechStacks.join(', ')})`),
      );
    }
    try {
      await this.projectsRepository.save({
        ...project,
        ...updateProjectInput,
        techStacks: techStacks,
      });
      return await this.findOne(id);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Project'));
    }
  }

  private async getTechStacks(techStacksIds: string[]): Promise<{
    techStacks: TechStack[];
    notFoundTechStacks: string[];
  }> {
    const techStacks = await this.techStackRepository.find({
      where: {
        id: In(techStacksIds),
      },
    });
    const notFoundTechStacks = techStacksIds.filter(
      (techId) => !techStacks.find((tech) => tech.id === techId),
    );
    return { techStacks, notFoundTechStacks };
  }

  async remove(
    id: string,
  ): Promise<void | NotFoundException | BadRequestException> {
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
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_DELETED('Project'));
    }
  }
}
