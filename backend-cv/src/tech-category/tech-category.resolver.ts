import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TechCategoryService } from './tech-category.service';
import { TechCategory } from './entities/tech-category.entity';
import { CreateTechCategoryInput } from './dto/create-tech-category.input';
import { UpdateTechCategoryInput } from './dto/update-tech-category.input';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { UseGuards } from '@nestjs/common';
import { PermissionGuard } from '../decorators/permission.decorator';
import { Resource } from '../roles/enums/resource.enum';
import { Action } from '../roles/enums/action.enum';
import { Public } from 'src/decorators/public.decorator';
import { TechStack } from 'src/techstack/entities/techstack.entity';

@UseGuards(AuthorizationGuard)
@Resolver(() => TechCategory)
export class TechCategoryResolver {
  constructor(private readonly techCategoryService: TechCategoryService) {}

  @PermissionGuard([{ resource: Resource.CATEGORY, actions: [Action.CREATE] }])
  @Mutation(() => TechCategory)
  createTechCategory(
    @Args('createTechCategoryInput')
    createTechCategoryInput: CreateTechCategoryInput,
  ) {
    return this.techCategoryService.create(createTechCategoryInput);
  }

  @Public()
  @Query(() => [TechCategory], { name: 'techCategories' })
  findAll() {
    return this.techCategoryService.findAll();
  }

  @Public()
  @Query(() => TechCategory, { name: 'techCategory' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.techCategoryService.findOne(id);
  }

  @Public()
  @ResolveField(() => [TechStack], { nullable: true })
  async techStacks(@Parent() techCategory: TechCategory) {
    const { id } = techCategory;
    return await this.techCategoryService.findAllTechStacks(id);
  }

  @PermissionGuard([{ resource: Resource.CATEGORY, actions: [Action.UPDATE] }])
  @Mutation(() => TechCategory)
  updateTechCategory(
    @Args('updateTechCategoryInput')
    updateTechCategoryInput: UpdateTechCategoryInput,
  ) {
    return this.techCategoryService.update(
      updateTechCategoryInput.id,
      updateTechCategoryInput,
    );
  }

  @PermissionGuard([{ resource: Resource.CATEGORY, actions: [Action.DELETE] }])
  @Mutation(() => ID)
  removeTechCategory(@Args('id', { type: () => ID }) id: string) {
    return this.techCategoryService.remove(id);
  }
}
