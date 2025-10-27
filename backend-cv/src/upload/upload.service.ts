import { BadRequestException, Injectable } from '@nestjs/common';
import { ContactsImageService } from 'src/contacts/contactsImage.service';
import { S3Service } from 'src/s3/s3.service';
import uploadVariables from 'src/variables/upload.variables';
import { SliderImageService } from 'src/sliders/sliderImage.service';
import { TechStackImageService } from 'src/techstack/tachstackImage.service';
import { ProjectsImageService } from 'src/projects/projectsImage.service';
import { ProfileImageService } from 'src/profile/profileImage.service';

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
    if (index) keyOfImage = `${id}-${index}`;
    const serviceInstance = this.services[service];
    if (!serviceInstance) throw new BadRequestException('Service not found');
    const exist = await serviceInstance.getImageKey(keyOfImage);
    if (exist) await this.s3Service.deleteFile(exist);
    const url = await this.s3Service.uploadFile(
      file,
      `${keyOfImage}.${file.mimetype.split('/')[1]}`,
    );
    if (!url) throw new BadRequestException('Upload failed');
    if (index) return await serviceInstance.uploadImages({ id, images: [url]}); // todo dont delete all keys
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
    console.log(keys);
    if (keys) await this.s3Service.deleteFiles(keys);
    const urls = await this.s3Service.uploadFiles(files, id);
    return await serviceInstance.uploadImages({ id, images: urls });
  }
}
