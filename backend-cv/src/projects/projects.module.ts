import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { TechStack } from 'src/techstack/entities/techstack.entity';
import { ProjectsImageService } from './projectsImage.service';
import { S3Service } from 'src/s3/s3.service';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Project, TechStack]), AuthModule],
  providers: [
    ProjectsResolver,
    ProjectsService,
    ProjectsImageService,
    S3Service,
  ],
})
export class ProjectsModule {}
