import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from 'src/variables/upload.variables';
import { errors } from 'src/errors/errors.config';

@Injectable()
export class ProjectsImageService {
  public name: string;
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {
    this.name = uploadVariables.projects.name;
  }
  async uploadImages({ id, images }: { id: string; images: string[] }) {
    const exist = await this.projectsRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Project'));
    try {
      await this.projectsRepository.update(id, { projectImages: images });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_UPDATED('Project'), {
        cause: error,
      });
    }
    return { id, projectImages: images };
  }

  async getImageKey(id: string) {
    const projectId = id.split(`-`).slice(0, -1).join('-');
    const exist = await this.projectsRepository.existsBy({ id: projectId });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Project'));
    const project = await this.projectsRepository.findOneBy({ id: projectId });
    if (project.projectImages) {
      project.projectImages.forEach((image) => {
        if (image.includes(id)) {
          return decodeURIComponent(image.split(`/`).at(-1));
        }
      });
    }
    return null;
  }

  async getImageKeys(projectId: string) {
    const exist = await this.projectsRepository.existsBy({ id: projectId });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Project'));
    const project = await this.projectsRepository.findOneBy({ id: projectId });
    if (project.projectImages) {
      return project.projectImages.map((image) => {
        return decodeURIComponent(image.split(`/`).at(-1));
      });
    }
    return null;
  }
}

