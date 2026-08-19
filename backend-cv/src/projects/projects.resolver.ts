import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { S3Service } from '../s3/s3.service';
import { ProjectsImageService } from './projectsImage.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { PermissionGuard } from '../decorators/permission.decorator';
import { Resource } from '../roles/enums/resource.enum';
import { Action } from '../roles/enums/action.enum';
import { errors } from '../errors/errors.config';
import { TechStack } from '../techstack/entities/techstack.entity';
import uploadVariables from 'src/variables/upload.variables';

@UseGuards(AuthorizationGuard)
@Resolver(() => Project)
export class ProjectsResolver {
  private readonly serviceName = uploadVariables.projects.name
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly s3Service: S3Service,
    private readonly projectsImageService: ProjectsImageService,
  ) {}


  @PermissionGuard([{ resource: Resource.PROJECT, actions: [Action.CREATE] }])
  @Mutation(() => Project)
  async createProject(
    @Args('createProjectInput', { type: () => CreateProjectInput })
    createProjectInput: CreateProjectInput,
  ) {
    return await this.projectsService.create(createProjectInput);
  }

  @Public()
  @Query(() => [Project], { name: 'projects' })
  async findAll() {
    return await this.projectsService.findAll();
  }

  @Public()
  @Query(() => Project, { name: 'project' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.projectsService.findOne(id);
  }

  @Public()
  @ResolveField(() => [TechStack], { nullable: true })
  async techStacks(@Parent() project: Project) {
    const { id } = project;
    return this.projectsService.findAllTechStacks(id);
  }


  @PermissionGuard([{ resource: Resource.PROJECT, actions: [Action.UPDATE] }])
  @Mutation(() => Project)
  async updateProject(
    @Args('updateProjectInput', { type: () => UpdateProjectInput })
    updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectsService.update(
      updateProjectInput.id,
      updateProjectInput,
    );
  }


  @PermissionGuard([{ resource: Resource.PROJECT, actions: [Action.DELETE] }])
  @Mutation(() => ID)
  async removeProject(@Args('id', { type: () => ID }) id: string) {
    try {
      const urls = await this.projectsImageService.getImageKeys(id);
      await this.projectsService.remove(id);
      if (urls) {
        await this.s3Service.deleteFiles(urls, this.serviceName, id);
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_DELETED('Project'), {
        cause: error,
      });
    }
    return id;
  }

   @PermissionGuard([
    { resource: Resource.PROJECT, actions: [Action.DELETE] },
  ])
  @Mutation(() => [ID])
  async removeProjects(@Args('ids', { type: () => [ID] }) ids: string[]) {
    try {
      const urls = await this.projectsImageService.getImageKeysIds(ids);
      await this.projectsService.removeMany(ids);
      await this.s3Service.deleteFilesFromIds(this.serviceName, urls);
    } catch (error) {
      throw new BadRequestException(errors.NOT_DELETED('Projects'), {
        cause: error,
      });
    }
    return ids;
  }
}
