import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput {

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  surname?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  typingText?: string;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => [String], { nullable: true })
  profilePhoto?: string[];
}
