import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { TechStack } from '../techstack/entities/techstack.entity';
import { ProjectsImageService } from './projectsImage.service';
import { S3Service } from '../s3/s3.service';
import { AuthModule } from '../auth/auth.module';
import { Logger } from '@nestjs/common';
@Module({
  imports: [TypeOrmModule.forFeature([Project, TechStack]), AuthModule],
  providers: [
    ProjectsResolver,
    ProjectsService,
    ProjectsImageService,
    S3Service,
    Logger,
  ],
})
export class ProjectsModule {}
