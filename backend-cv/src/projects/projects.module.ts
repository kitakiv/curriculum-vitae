import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { TechStack } from 'src/techstack/entities/techstack.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Project, TechStack])],
  providers: [ProjectsResolver, ProjectsService],
})
export class ProjectsModule {}
