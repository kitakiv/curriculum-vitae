import { InputType, Field } from '@nestjs/graphql';
import { CreateTagImageInput } from './create-image.input';

@InputType()
export class CreateTagInput {
  @Field(() => String)
  tagName: string;

  @Field(() => CreateTagImageInput)
  tagImage: CreateTagImageInput;
}
