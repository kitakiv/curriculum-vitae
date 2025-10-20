import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Public } from 'src/decorators/public.decorator';

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

  @Public()
  @Query(() => Profile, { name: 'profile' })
  async find() {
    return await this.profileService.find();
  }
}
