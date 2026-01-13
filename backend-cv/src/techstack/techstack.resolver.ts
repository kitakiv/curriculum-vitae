import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
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


@UseGuards(AuthorizationGuard)
@Resolver(() => TechStack)
export class TechStackResolver {
  constructor(
    private readonly techStackService: TechStackService,
    private readonly s3Service: S3Service,
    private readonly techStackImageService: TechStackImageService,
  ) {}


  @PermissionGuard([{ resource: Resource.TECHSTACK, actions: [Action.CREATE] }])
  @Mutation(() => TechStack)
  async createTechStack(
    @Args('CreateTechStackInput', { type: () => CreateTechStackInput })
    createTechStackInput: CreateTechStackInput,
  ) {
    return await this.techStackService.create(createTechStackInput);
  }

  @Public()
  @Query(() => [TechStack], { name: 'techstacks' })
  async findAll() {
    return await this.techStackService.findAll();
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

  @PermissionGuard([{ resource: Resource.TECHSTACK, actions: [Action.UPDATE] }])
  @Mutation(() => TechStack)
  async updateTechStack(
    @Args('UpdateTechStackInput', { type: () => UpdateTechStackInput })
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
      const key = await this.techStackImageService.getImageKey(id);
      await this.techStackService.remove(id);
      if (key) await this.s3Service.deleteFile(key);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(errors.NOT_DELETED('TechStack'), {
        cause: error,
      });
    }
    return id;
  }
}
