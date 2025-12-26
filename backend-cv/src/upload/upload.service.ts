import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ContactsImageService } from '../contacts/contactsImage.service';
import { S3Service } from '../s3/s3.service';
import uploadVariables from '../variables/upload.variables';
import { SliderImageService } from '../sliders/sliderImage.service';
import { TechStackImageService } from '../techstack/tachstackImage.service';
import { ProjectsImageService } from '../projects/projectsImage.service';
import { ProfileImageService } from '../profile/profileImage.service';


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
    private readonly logger: Logger = new Logger(UploadService.name),
  ) {
    this.services = {
      [uploadVariables.contacts.name]: this.contactsImageService,
      [uploadVariables.sliders.name]: this.sliderImageService,
      [uploadVariables.techstack.name]: this.techStackImageService,
      [uploadVariables.projects.name]: this.projectsImageService,
      [uploadVariables.profile.name]: this.profileImageService,
    };
  }

  async uploadFile({
    id,
    file,
    service,
    index,
  }: {
    id: string;
    file: Express.Multer.File;
    service: string;
    index?: number;
  }) {
    let keyOfImage: string = id;
    if (index || index === 0) keyOfImage = `${id}-${index}`;
    const serviceInstance = this.services[service];
    if (!serviceInstance) throw new BadRequestException('Service not found');
    const exist = await serviceInstance.getImageKey(keyOfImage);
    if (exist) await this.s3Service.deleteFile(exist);
    const url = await this.s3Service.uploadFile(
      file,
      `${keyOfImage}.${file.mimetype.split('/')[1]}`,
    );
    if (!url) throw new BadRequestException('Upload failed');
    if (index || index === 0)
      return await serviceInstance.uploadImageIndex({ id, index, url });
    return await serviceInstance.uploadImage({ id, image: url });
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
    const keys = await serviceInstance.getImageKeys(id);
    if (keys) await this.s3Service.deleteFiles(keys);
    try {
      const urls = await this.s3Service.uploadFiles(files, id);
      return await serviceInstance.uploadImages({ id, images: urls });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Upload failed');
    }
  }
}
