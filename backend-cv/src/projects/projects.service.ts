import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechStack } from 'src/techstack/entities/techstack.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(TechStack)
    private readonly techStackRepository: Repository<TechStack>,
  ) {}
  async create(createProjectInput: CreateProjectInput) {
    const techStacks = createProjectInput.techStacks.map(async (techId) => {
      const techStack = await this.techStackRepository.findOneBy({
        id: techId,
      });
      if (!techStack) throw new Error('TechStack not found');
      return techStack;
    });
    const project = new Project({
      ...createProjectInput,
      techStacks: await Promise.all(techStacks),
    });
    return await this.projectsRepository.save(project);
  }

  async findAll() {
    return await this.projectsRepository.find({
      relations: {
        techStacks: true,
      },
    });
  }

  async findOne(id: string) {
    const exits = await this.projectsRepository.existsBy({ id });
    if (!exits) throw new Error('Project not found');
    return await this.projectsRepository.find({
      where: { id },
      relations: {
        techStacks: true,
      },
    });
  }

  async update(id: string, updateProjectInput: UpdateProjectInput) {
    const exist = await this.projectsRepository.existsBy({ id });
    if (!exist) throw new Error('Project not found');
    const techStacks = updateProjectInput.techStacks.map(async (techId) => {
      const techStack = await this.techStackRepository.findOneBy({
        id: techId,
      });
      if (!techStack) throw new Error('TechStack not found');
      return techStack;
    });
    return await this.projectsRepository.update(id, {
      ...updateProjectInput,
      techStacks: await Promise.all(techStacks),
    });
  }

  async remove(id: string) {
    const exist = await this.projectsRepository.existsBy({ id });
    if (!exist) throw new Error('Project not found');
    await this.projectsRepository.delete(id);
    return `Project ${id} deleted`;
  }
}
