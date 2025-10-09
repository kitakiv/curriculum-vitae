import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectImage, TagImage } from './entities/projectImage.entity';
import { ProjectTag } from './entities/projectTags.entitiy';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(ProjectTag)
    private readonly projectImageRepository: Repository<ProjectTag>,
  ) {}
  async create(createProjectInput: CreateProjectInput) {
    const project = { ...createProjectInput };
    const projectImages = project.projectImages.map((image) => {
      const imagesProject = new ProjectImage(image);
      return imagesProject;
    });
    const projectTags = project.tags.map((tag) => {
      const tagImage = new TagImage(tag.tagImage);
      const projectTag = new ProjectTag({
        ...tag,
        tagImage,
      });
      return projectTag;
    });
    const createdProject = new Project({
      ...project,
      projectImages,
      tags: projectTags,
    });
    const savedProject = await this.projectsRepository.create(createdProject);
    await this.projectsRepository.save(savedProject);
    return savedProject;
  }

  async findAll() {
    return await this.projectsRepository.find({
      relations: {
        projectImages: true,
        tags: {
          tagImage: true,
        },
      },
    });
  }

  async findOne(id: string) {
    const exits = await this.projectsRepository.existsBy({ id });
    if (!exits) throw new Error('Project not found');
    return await this.projectsRepository.find({
      where: { id },
      relations: {
        projectImages: true,
        tags: {
          tagImage: true,
        },
      },
    });
  }

  async update(id: string, updateProjectInput: UpdateProjectInput) {
    const exist = await this.projectsRepository.existsBy({ id });
    if (!exist) throw new Error('Project not found');
    const project = { ...updateProjectInput };
    if (project.projectImages) {
      const projectImages = project.projectImages.map((image) => {
        const imagesProject = new ProjectImage(image);
        return imagesProject;
      });
      project.projectImages = projectImages;
    }
    if (project.tags) {
      const projectTags = project.tags.map((tag) => {
        const tagImage = new TagImage(tag.tagImage);
        const projectTag = new ProjectTag({
          ...tag,
          tagImage,
        });
        return projectTag;
      });
      project.tags = projectTags;
    }
    await this.projectsRepository.update(id, project);
    return await this.projectsRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const exist = await this.projectsRepository.existsBy({ id });
    if (!exist) throw new Error('Project not found');
    await this.projectsRepository.delete(id);
    return `Project ${id} deleted`;
  }

  async findAllTags() {
    return await this.projectImageRepository.find({
      relations: {
        tagImage: true,
      },
    });
  }
}
