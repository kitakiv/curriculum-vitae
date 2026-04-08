import { Logger, Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { S3Service } from '../s3/s3.service';
import { UploadService } from './upload.service';
import { ContactsImageService } from '../contacts/contactsImage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '../contacts/entities/contact.entity';
import { SliderImageService } from '../sliders/sliderImage.service';
import { Slider } from '../sliders/entities/slider.entity';
import { TechStack } from '../techstack/entities/techstack.entity';
import { TechStackImageService } from '../techstack/tachstackImage.service';
import { ProjectsImageService } from '../projects/projectsImage.service';
import { Project } from '../projects/entities/project.entity';
import { Profile } from '../profile/entities/profile.entity';
import { ProfileImageService } from '../profile/profileImage.service';
import { AuthModule } from '../auth/auth.module';
import { Certificate } from '../certificate/entities/certificate.entity';
import { CertificateImageService } from 'src/certificate/certificateImage.service';
import { RedisCacheModule } from 'src/cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contact,
      Slider,
      TechStack,
      Project,
      Profile,
      Certificate,
    ]),
    AuthModule,
    RedisCacheModule
  ],
  controllers: [UploadController],
  providers: [
    S3Service,
    UploadService,
    ContactsImageService,
    SliderImageService,
    TechStackImageService,
    ProjectsImageService,
    ProfileImageService,
    CertificateImageService,
    Logger
  ],
})
export class UploadModule {}
