import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

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
    return await this.projectsService.remove(id);
  }
}
