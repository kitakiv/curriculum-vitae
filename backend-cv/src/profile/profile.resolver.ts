import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}


  @Mutation(() => Profile)
  async updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return await this.profileService.update(
      updateProfileInput.id,
      updateProfileInput,
    );
  }

  @Query(() => Profile)
  async find() {
    return await this.profileService.find();
  }
}
