import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  async updateProfile(
    @Args('updateProfileInput', { type: () => UpdateProfileInput })
    updateProfileInput: UpdateProfileInput,
  ) {
    return await this.profileService.update(updateProfileInput);
  }

  @Query(() => Profile, { name: 'profile' })
  async find() {
    return await this.profileService.find();
  }
}
