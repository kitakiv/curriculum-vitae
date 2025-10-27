import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { S3Service } from 'src/s3/s3.service';
import { UploadService } from './upload.service';
import { ContactsImageService } from 'src/contacts/contactsImage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/contacts/entities/contact.entity';
import { SliderImageService } from 'src/sliders/sliderImage.service';
import { Slider } from 'src/sliders/entities/slider.entity';
import { TechStack } from 'src/techstack/entities/techstack.entity';
import { TechStackImageService } from 'src/techstack/tachstackImage.service';
import { ProjectsImageService } from 'src/projects/projectsImage.service';
import { Project } from 'src/projects/entities/project.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { ProfileImageService } from 'src/profile/profileImage.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact, Slider, TechStack, Project, Profile]),
    AuthModule
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
  ],
})
export class UploadModule {}
