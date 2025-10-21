import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Public } from 'src/decorators/public.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { PermissionGuard } from 'src/decorators/permission.decorator';
import { Resource } from 'src/roles/enums/resource.enum';
import { Action } from 'src/roles/enums/action.enum';

@UseGuards(AuthorizationGuard)
@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @PermissionGuard({ resource: Resource.PROFILE, actions: [Action.UPDATE] })
  @Mutation(() => Profile)
  async updateProfile(
    @Args('updateProfileInput', { type: () => UpdateProfileInput })
    updateProfileInput: UpdateProfileInput,
  ) {
    return await this.profileService.update(updateProfileInput);
  }

  @Public()
  @Query(() => Profile, { name: 'profile' })
  async find() {
    return await this.profileService.find();
  }
}
