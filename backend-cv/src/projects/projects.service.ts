import {
  BadGatewayException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechStack } from '../techstack/entities/techstack.entity';
import { errors } from '../errors/errors.config';
import { RedisCacheService } from '../cache/cache.service';
import uploadVariables from '../variables/upload.variables';
@Injectable()
export class ProjectsService {
  private readonly PROJECT_CACHE_KEY = uploadVariables.projects.cacheKey;
  private readonly PROJECT_CACHE_TIME = uploadVariables.projects.cacheTime;
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
    private readonly logger: Logger = new Logger(ProjectsService.name),
    private readonly redisCacheService: RedisCacheService,
  ) {}
  async create(createProjectInput: CreateProjectInput) {
    const stack = createProjectInput.techStacks || [];
    const techStacks = stack.map(async (techId) => {
      const techStack = await this.techStackRepository.findOneBy({
        id: techId,
      });
      if (!techStack)
        throw new NotFoundException(errors.NOT_FOUND('TechStack'));
      return techStack;
    });
    try {
      const project = this.projectsRepository.create({
        ...createProjectInput,
        techStacks: await Promise.all(techStacks),
      });
      return await this.projectsRepository.save(project);
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
    const project = await this.projectsRepository.findOneBy({ id });
    if (!project) throw new NotFoundException(errors.NOT_FOUND('Project'));
    // if techStacks is null
    if (!updateProjectInput.techStacks) {
      try {
        await this.projectsRepository.update(id, {
          ...updateProjectInput,
          techStacks: project.techStacks,
        });
      } catch (error) {
        this.logger.error(error);
        throw new BadGatewayException(errors.NOT_UPDATED('Project'));
      }
      return await this.projectsRepository.findOneBy({ id });
    }
    const techStacks = updateProjectInput.techStacks.map(async (techId) => {
      const techStack = await this.techStackRepository.findOneBy({
        id: techId,
      });
      if (!techStack)
        throw new NotFoundException(errors.NOT_FOUND(`TechStack ${techId}`));
      return techStack;
    });
    try {
      await this.projectsRepository.update(id, {
        ...updateProjectInput,
        techStacks: await Promise.all(techStacks),
      });
      return await this.projectsRepository.findOneBy({ id });
    } catch (error) {
      this.logger.error(error);
      throw new BadGatewayException(errors.NOT_UPDATED('Project'));
    }
  }

  async remove(id: string) {
    const exist = await this.projectsRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Project'));
    try {
      await this.projectsRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException(errors.NOT_DELETED('Project'));
    }
    await this.projectsRepository.delete(id);
    return { id };
  }
}
