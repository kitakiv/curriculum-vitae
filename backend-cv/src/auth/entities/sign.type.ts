import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class Sign {
  @Field(() => String, { description: 'Access token' })
  accessToken: string;

  refreshToken: string;
}
