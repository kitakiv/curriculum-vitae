import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProjectImageInput {
  @Field(() => String)
  imageLink: string;
}

@InputType()
export class CreateTagImageInput {
  @Field(() => String)
  imageLink: string;

  @Field(() => String)
  tagName: string;
}
