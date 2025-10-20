import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class Sing {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
