import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PasswordData {
  @Field(() => String, { description: 'Password reset message' })
  message: string;
}
