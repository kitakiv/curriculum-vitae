import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechStack } from '../techstack/entities/techstack.entity';
import { errors } from '../errors/errors.config';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
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
      console.log(error);
      throw new NotFoundException(errors.NOT_CREATED('Project'), {
        cause: error,
      });
    }
  }

  async findAll() {
    return await this.projectsRepository.find({
      relations: {
        techStacks: true,
      },
    });
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
        console.log(error);
        throw new NotFoundException(errors.NOT_UPDATED('Project'), {
          cause: error,
        });
      }
      return await this.projectsRepository.findOneBy({ id });
    }
    const techStacks = updateProjectInput.techStacks.map(async (techId) => {
      const techStack = await this.techStackRepository.findOneBy({
        id: techId,
      });
      if (!techStack)
        throw new NotFoundException(errors.NOT_FOUND('TechStack'));
      return techStack;
    });
    return await this.projectsRepository.update(id, {
      ...updateProjectInput,
      techStacks: await Promise.all(techStacks),
    });
  }

  async remove(id: string) {
    const exist = await this.projectsRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Project'));
    await this.projectsRepository.delete(id);
    return { id };
  }
}
