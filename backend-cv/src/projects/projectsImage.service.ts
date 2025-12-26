import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import uploadVariables from '../variables/upload.variables';
import { errors } from '../errors/errors.config';

@Injectable()
export class ProjectsImageService {
  public name: string;
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    private readonly logger: Logger = new Logger(ProjectsImageService.name),
  ) {
    this.name = uploadVariables.projects.name;
  }
  async uploadImages({ id, images }: { id: string; images: string[] }) {
    const exist = await this.projectsRepository.existsBy({ id });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Project'));
    try {
      await this.projectsRepository.update(id, { projectImages: images });
      return { id, projectImages: images };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Project'));
    }
  }

  async uploadImageIndex({
    id,
    index,
    url,
  }: {
    id: string;
    index: number;
    url: string;
  }) {
    const project = await this.projectsRepository.findOneBy({ id });
    if (!project) throw new NotFoundException(errors.NOT_FOUND('Project'));
    const images = project.projectImages || [];
    const filterImages = images.filter((image) => {
      return !image.includes(`${id}-${index}`);
    });
    filterImages.push(url);
    try {
      await this.projectsRepository.update(id, { projectImages: filterImages });
      return { id, projectImages: filterImages };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Project'));
    }
  }

  async getImageKey(id: string) {
    const projectId = id.split(`-`).slice(0, -1).join('-');
    const exist = await this.projectsRepository.existsBy({ id: projectId });
    if (!exist) throw new NotFoundException(errors.NOT_FOUND('Project'));
    const project = await this.projectsRepository.findOneBy({ id: projectId });
    if (project.projectImages) {
      const foundImage = project.projectImages.find((image) =>
        image.includes(id),
      );
      if (foundImage) {
        return decodeURIComponent(foundImage.split(`/`).at(-1));
      }
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
