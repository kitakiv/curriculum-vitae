import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Role)
  async createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return await this.rolesService.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'roles' })
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Query(() => Role, { name: 'role' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.rolesService.findOne(id);
  }

  // @Mutation(() => Role)
  // updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
  //   return this.rolesService.update(updateRoleInput.id, updateRoleInput);
  // }

  @Mutation(() => Role)
  async removeRole(@Args('id', { type: () => String }) id: string) {
    return await this.rolesService.remove(id);
  }
}
