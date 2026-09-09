import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ContactsImageService } from '../contacts/contactsImage.service';
import { S3Service } from '../s3/s3.service';
import uploadVariables from '../variables/upload.variables';
import { SliderImageService } from '../sliders/sliderImage.service';
import { TechStackImageService } from '../techstack/tachstackImage.service';
import { ProjectsImageService } from '../projects/projectsImage.service';
import { ProfileImageService } from '../profile/profileImage.service';
import { CertificateImageService } from 'src/certificate/certificateImage.service';
import { SingleImage, SingleImageBaseClass } from './interface/singleImage.abstract';
import { MultiImageBaseClass } from './interface/multiImage.abstract';
import { RedisCacheService } from 'src/cache/cache.service';
import { MAX_FILE_IMAGES } from 'src/common/constants';
import { UserImageService } from '../auth/authImage.server';


@Injectable()
export class UploadService {
  private services;
  constructor(
    private readonly s3Service: S3Service,
    private readonly contactsImageService: ContactsImageService,
    private readonly sliderImageService: SliderImageService,
    private readonly techStackImageService: TechStackImageService,
    private readonly projectsImageService: ProjectsImageService,
    private readonly profileImageService: ProfileImageService,
    private readonly certificateImageService: CertificateImageService,
    private readonly userImageService: UserImageService,
    private readonly cacheService: RedisCacheService,
    private readonly logger: Logger = new Logger(UploadService.name),
  ) {
    this.services = {
      [uploadVariables.contacts.name]: this.contactsImageService,
      [uploadVariables.sliders.name]: this.sliderImageService,
      [uploadVariables.techstack.name]: this.techStackImageService,
      [uploadVariables.projects.name]: this.projectsImageService,
      [uploadVariables.profile.name]: this.profileImageService,
      [uploadVariables.certificate.name]: this.certificateImageService,
      [uploadVariables.user.name]: this.userImageService,
    };
  }

  async deleteCache(service: string) {
    const cacheKey = uploadVariables[service].cacheKey;
    if (cacheKey) await this.cacheService.del(cacheKey);
  }

  async uploadFile({
    id,
    file,
    service,
  }: {
    id: string;
    file: Express.Multer.File;
    service: string;
  }) {
    const serviceInstance = this.services[service];

    if (!serviceInstance) throw new BadRequestException('Service not found');
    if (!(serviceInstance instanceof SingleImageBaseClass)) throw new BadRequestException('Service not found');
    // get image
    const urlOfImage = await serviceInstance.getImageKey(id);

    // delete image if exist
    if (urlOfImage) await this.s3Service.deleteFile(urlOfImage, service, id);

    const url = await this.s3Service.uploadFile(
      file,
      service,
      id,
    );
    if (!url) throw new BadRequestException('Upload failed');
    await this.deleteCache(service);
    return await serviceInstance.uploadImage({ id, image: url });
  }

  async uploadFileMore({ file, service, id }: { file: Express.Multer.File; service: string; id: string }) {
    const serviceInstance = this.services[service];
    if (!serviceInstance) throw new BadRequestException('Service not found');
    if (!(serviceInstance instanceof MultiImageBaseClass)) throw new BadRequestException('Service not found');
    const keys = await serviceInstance.getImageKeys(id);
    if (keys.length < MAX_FILE_IMAGES) {
      const url = await this.s3Service.uploadFile(file, service, id);
      if (!url) throw new BadRequestException('Upload failed');
      await this.deleteCache(service);
      return await serviceInstance.uploadImage({ id, url });
    }
    throw new BadRequestException(`Maximum number of images reached ${MAX_FILE_IMAGES}`);
  }
  async uploadFiles({
    files,
    service,
    id,
  }: {
    files: Array<Express.Multer.File>;
    service: string;
    id: string;
  }) {
    const serviceInstance = this.services[service];
    if (!serviceInstance) throw new BadRequestException('Service not found');
    if (!(serviceInstance instanceof MultiImageBaseClass)) throw new BadRequestException('Service not found');
    const urls = await serviceInstance.getImageKeys(id);

    if (urls) await this.s3Service.deleteFiles(urls, service, id);

    try {
      const urls = await this.s3Service.uploadFiles(files, service, id);
      await this.deleteCache(service);
      return await serviceInstance.uploadImages({ id, images: urls });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Upload failed');
    }
  }

  async uploadFileIndex({ file, service, resourceId, imageId }: { file: Express.Multer.File; service: string; resourceId: string; imageId: string }) {
    const serviceInstance = this.services[service];
    if (!serviceInstance) throw new BadRequestException('Service not found');
    if (!(serviceInstance instanceof MultiImageBaseClass)) throw new BadRequestException('Service not found');
    const url = await serviceInstance.getImageKey(resourceId, imageId);

    if (url) await this.s3Service.deleteFile(url, service, resourceId);

    try {
      const url = await this.s3Service.uploadFile(file, service, resourceId);
      await this.deleteCache(service);
      return await serviceInstance.uploadImageIndex({ id: resourceId, previousImageId: imageId, url });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Upload failed');
    }
  }

  async deleteFileIndex({ service, resourceId, imageId }: { service: string; resourceId: string; imageId: string }) {
    const serviceInstance = this.services[service];
    if (!serviceInstance) throw new BadRequestException('Service not found');
    if (!(serviceInstance instanceof MultiImageBaseClass)) 
      throw new BadRequestException('Service not found');
    const url = await serviceInstance.getImageKey(resourceId, imageId);
    if (url) await this.s3Service.deleteFile(url, service, resourceId);
    await this.deleteCache(service);
    return await serviceInstance.deleteImageIndex({ id: resourceId, imageId });
  }
}
