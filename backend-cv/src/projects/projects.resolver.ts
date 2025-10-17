import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { S3Service } from 'src/s3/s3.service';
import { ProjectsImageService } from './projectsImage.service';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly s3Service: S3Service,
    private readonly projectsImageService: ProjectsImageService,
  ) {}

  @Mutation(() => Project)
  async createProject(
    @Args('createProjectInput', { type: () => CreateProjectInput })
    createProjectInput: CreateProjectInput,
  ) {
    return await this.projectsService.create(createProjectInput);
  }

  @Query(() => [Project], { name: 'projects' })
  async findAll() {
    return await this.projectsService.findAll();
  }

  @Query(() => Project, { name: 'project' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.projectsService.findOne(id);
  }

  @Mutation(() => Project)
  async updateProject(
    @Args('updateProjectInput', { type: () => UpdateProjectInput })
    updateProjectInput: UpdateProjectInput,
  ) {
    return await this.projectsService.update(
      updateProjectInput.id,
      updateProjectInput,
    );
  }

  @Mutation(() => Project)
  async removeProject(@Args('id', { type: () => ID }) id: string) {
    try {
      const keys = await this.projectsImageService.getImageKeys(id);
      await this.projectsService.remove(id);
      if (keys) {
        await this.s3Service.deleteFiles(keys);
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
    return { id, projectImages: [] as string[] };
  }
}
