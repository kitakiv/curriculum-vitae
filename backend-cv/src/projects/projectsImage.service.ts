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
import { images } from 'src/variables/image.variables';
import { MultiImage, MultiImageBaseClass } from 'src/upload/interface/multiImage.abstract';

@Injectable()
export class ProjectsImageService extends MultiImageBaseClass {
  public name: string;
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    private readonly logger: Logger = new Logger(ProjectsImageService.name),
  ) {
    super();
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

  async uploadImage({ id, url }: { id: string; url: string }) {
    const project = await this.projectsRepository.findOneBy({ id });
    if (!project) throw new NotFoundException(errors.NOT_FOUND('Project'));
    try {
      const projectImages = project.projectImages || [];
      projectImages.push(url);
      await this.projectsRepository.update(id, {projectImages: projectImages});
      return { id, projectImages: projectImages };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Project'));
    }
  }

  async uploadImageIndex({
    id,
    previousImageId,
    url,
  }: {
    id: string;
    previousImageId: string;
    url: string;
  }) {
    const project = await this.projectsRepository.findOneBy({ id });
    if (!project) throw new NotFoundException(errors.NOT_FOUND('Project'));
    const images = project.projectImages || [];
    const updatedImages = images.map((image) => {
      if (image.includes(previousImageId)) { // instead of previousImageId push new url
        return url;
      }
      return image;
    });
    try {
      await this.projectsRepository.update(id, { projectImages: updatedImages });
      return { id, projectImages: updatedImages };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Project'));
    }
  }

  async deleteImageIndex({
    id,
    imageId,
  }: {
    id: string;
    imageId: string;
  }) {
    const project = await this.projectsRepository.findOneBy({ id });
    if (!project) throw new NotFoundException(errors.NOT_FOUND('Project'));
    const images = project.projectImages || [];
    const updatedImages = images.filter((image) => !image.includes(imageId));
    try {
      await this.projectsRepository.update(id, { projectImages: updatedImages });
      console.log(updatedImages);
      return { id, projectImages: updatedImages };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(errors.NOT_UPDATED('Project'));
    }
  }

  async getImageKey(resourceId: string, imageId: string) {
    const project = await this.projectsRepository.findOneBy({ id: resourceId });
    if (!project) throw new NotFoundException(errors.NOT_FOUND('Project'));
    if (project.projectImages) {
      const foundImage = project.projectImages.find((image) =>
        image.includes(imageId),
      );
      if (foundImage) {
        return foundImage;
      }
    }
    return null;
  }

  async getImageKeys(resourceId: string) {
    const project = await this.projectsRepository.findOneBy({ id: resourceId });
    if (!project) throw new NotFoundException(errors.NOT_FOUND('Project'));
    if (project.projectImages) {
      return project.projectImages;
    }
    return null;
  }
}
