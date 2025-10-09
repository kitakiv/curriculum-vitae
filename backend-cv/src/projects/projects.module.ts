import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectImage, TagImage } from './entities/projectImage.entity';
import { ProjectTag } from './entities/projectTags.entitiy';
@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectImage, ProjectTag, TagImage]),
  ],
  providers: [ProjectsResolver, ProjectsService],
})
export class ProjectsModule {}
