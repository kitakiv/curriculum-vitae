import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field(() => String, { nullable: true })
  imageLink: string;
}
