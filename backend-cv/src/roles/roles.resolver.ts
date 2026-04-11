import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { UseGuards, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { PermissionGuard } from '../decorators/permission.decorator';
import { Resource } from './enums/resource.enum';
import { Action } from './enums/action.enum';
import { Permission } from './entities/permission.entity';
import { User } from '../auth/entities/user.entity';
import { CurrentUserId } from '../decorators/currentuserid.decorator';
import { AuthService } from '../auth/auth.service';
import { allPermission } from './entities/allPermission.entity';
import { SuperAdminGuard } from 'src/guards/superAdmin.guard';
import { SuperAdmin } from 'src/decorators/superadmin.deconrator';
import { errors } from 'src/errors/errors.config';


@UseGuards(AuthorizationGuard, SuperAdminGuard)
@Resolver(() => Role)
export class RolesResolver {
  constructor(
    private readonly rolesService: RolesService,
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}


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

  @PermissionGuard([{ resource: Resource.ROLE, actions: [Action.READ] }])
  @ResolveField(() => [Permission], { nullable: true })
  async permissions(@Parent() role: Role) {
    const { id } = role;
    return this.rolesService.findAllPermissions(id);
  }


  @ResolveField(() => [User])
  async users(@Parent() user: User, @CurrentUserId() userId: string) {
    const requiredRoutePermissions = [
      { resource: Resource.USER, actions: [Action.READ] },
    ];
    try {
      const canActivateCurrentField =
        await this.authService.canActivateCurrentPermissions(
          userId,
          requiredRoutePermissions,
        );
      if (!canActivateCurrentField) return null;
      const { id } = user;
      return this.rolesService.findAllUsers(id);
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }

  @PermissionGuard([{ resource: Resource.ROLE, actions: [Action.UPDATE] }])
  @SuperAdmin()
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
  @SuperAdmin()
  @Mutation(() => ID)
  async removeRole(@Args('id', { type: () => ID }) id: string) {
    return await this.rolesService.remove(id);
  }

  
  @Query(() => [allPermission], { name: 'permissions' })
  async findPermissions(@CurrentUserId() userId: string,) {
    if (!userId) throw new UnauthorizedException(errors.NOT_FOUND('User'));
    return this.rolesService.findPermissions();
  }
}
