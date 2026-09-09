import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { TechStackService } from './techstack.service';
import { TechStack } from './entities/techstack.entity';
import { CreateTechStackInput } from './dto/create-techstack.input';
import { UpdateTechStackInput } from './dto/update-techstack.input';
import { S3Service } from '../s3/s3.service';
import { TechStackImageService } from './tachstackImage.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { Resource } from '../roles/enums/resource.enum';
import { Action } from '../roles/enums/action.enum';
import { PermissionGuard } from '../decorators/permission.decorator';
import { errors } from '../errors/errors.config';
import { Project } from '../projects/entities/project.entity';
import { TechCategory } from '../tech-category/entities/tech-category.entity';
import uploadVariables from 'src/variables/upload.variables';
import { TechStackPaginationResponse } from './entities/techstackPagination.type';


@UseGuards(AuthorizationGuard)
@Resolver(() => TechStack)
export class TechStackResolver {

  private readonly serviceName = uploadVariables.techstack.name
  constructor(
    private readonly techStackService: TechStackService,
    private readonly s3Service: S3Service,
    private readonly techStackImageService: TechStackImageService,
  ) {}


  @PermissionGuard([{ resource: Resource.TECHSTACK, actions: [Action.CREATE] }])
  @Mutation(() => TechStack)
  async createTechStack(
    @Args('createTechStackInput', { type: () => CreateTechStackInput })
    createTechStackInput: CreateTechStackInput,
  ) {
    return await this.techStackService.create(createTechStackInput);
  }

  @Public()
  @Query(() => [TechStack], { name: 'techstacks' })
  async findAllTechStacks() {
    return await this.techStackService.findAllTechStacks();
  }

  @Public()
  @Query(() => TechStackPaginationResponse, { name: 'techstackPagination' })
  async findAll(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit?: number,
    @Args('page', { type: () => Int, defaultValue: 1 }) page?: number,
    @Args('categoryId', { type: () => ID , nullable: true }) categoryId?: string | null
  ) {
    return await this.techStackService.findAll({ limit, page, categoryId });
  }

  @Public()
  @Query(() => TechStack, { name: 'techstack' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.techStackService.findOne(id);
  }

  @Public()
  @ResolveField(() => [Project], { nullable: true })
  async projects(@Parent() techStack: TechStack) {
    const { id } = techStack;
    return await this.techStackService.findAllProjects(id);
  }

  @Public()
  @ResolveField(() => [TechCategory], { nullable: true })
  async techCategories(@Parent() techStack: TechStack) {
    const { id } = techStack;
    return await this.techStackService.findAllCategories(id);
  }

  @PermissionGuard([{ resource: Resource.TECHSTACK, actions: [Action.UPDATE] }])
  @Mutation(() => TechStack)
  async updateTechStack(
    @Args('updateTechStackInput', { type: () => UpdateTechStackInput })
    updateTechStackInput: UpdateTechStackInput,
  ) {
    return await this.techStackService.update(
      updateTechStackInput.id,
      updateTechStackInput,
    );
  }


  @PermissionGuard([{ resource: Resource.TECHSTACK, actions: [Action.DELETE] }])
  @Mutation(() => ID)
  async removeTechStack(@Args('id', { type: () => ID }) id: string) {
    try {
      const url = await this.techStackImageService.getImageKey(id);
      await this.techStackService.remove(id);
      if (url) await this.s3Service.deleteFile(url, this.serviceName, id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_DELETED('TechStack'), {
        cause: error,
      });
    }
    return id;
  }

  @PermissionGuard([
    { resource: Resource.TECHSTACK, actions: [Action.DELETE] },
  ])
  @Mutation(() => [ID])
  async removeTechStacks(@Args('ids', { type: () => [ID] }) ids: string[]) {
    try {
      const urls = await this.techStackImageService.getImageKeys(ids);
      await this.techStackService.removeMany(ids);
      await this.s3Service.deleteFileFromIds(this.serviceName, urls);
    } catch (error) {
      throw new BadRequestException(errors.NOT_DELETED('TechStacks'), {
        cause: error,
      });
    }
    return ids;
  }
}
