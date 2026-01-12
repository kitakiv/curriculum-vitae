import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class Sign {
  @Field(() => String)
  accessToken: string;

  refreshToken: string;
}
