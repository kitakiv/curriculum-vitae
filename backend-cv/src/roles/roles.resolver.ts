import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { PermissionGuard } from '../decorators/permission.decorator';
import { Resource } from './enums/resource.enum';
import { Action } from './enums/action.enum';


@UseGuards(AuthorizationGuard)
@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}


  @PermissionGuard([{ resource: Resource.ROLE, actions: [Action.CREATE] }])
  @Mutation(() => Role)
  async createRole(
    @Args('createRoleInput', { type: () => CreateRoleInput })
    createRoleInput: CreateRoleInput,
  ) {
    return await this.rolesService.create(createRoleInput);
  }

  @PermissionGuard([{ resource: Resource.ROLE, actions: [Action.READ] }])
  @Query(() => [Role], { name: 'roles' })
  async findAll() {
    return await this.rolesService.findAll();
  }

  @PermissionGuard([{ resource: Resource.ROLE, actions: [Action.READ] }])
  @Query(() => Role, { name: 'role' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.rolesService.findOne(id);
  }

  @PermissionGuard([{ resource: Resource.ROLE, actions: [Action.UPDATE] }])
  @Mutation(() => Role)
  async updateRole(
    @Args('updateRoleInput', { type: () => UpdateRoleInput })
    updateRoleInput: UpdateRoleInput,
  ) {
    return this.rolesService.update(updateRoleInput.id, updateRoleInput);
  }


  @PermissionGuard([
    { resource: Resource.ROLE, actions: [Action.DELETE] },
    { resource: Resource.USER, actions: [Action.UPDATE] },
  ])
  @Mutation(() => ID)
  async removeRole(@Args('id', { type: () => ID }) id: string) {
    return await this.rolesService.remove(id);
  }
}
