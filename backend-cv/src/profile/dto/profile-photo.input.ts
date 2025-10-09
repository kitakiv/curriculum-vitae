import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ProfilePhotoInput {
  @Field(() => String)
  imageLink: string;
}
