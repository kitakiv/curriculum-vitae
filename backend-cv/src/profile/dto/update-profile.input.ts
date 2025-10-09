import { ProfilePhoto } from '../entities/profilePhoto.entity';
import { InputType, Field } from '@nestjs/graphql';
import { ProfilePhotoInput } from './profile-photo.input';

@InputType()
export class UpdateProfileInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  surname: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  typingText: string;

  @Field(() => String)
  location: string;

  @Field(() => [ProfilePhotoInput])
  profilePhoto: ProfilePhotoInput[];
}
