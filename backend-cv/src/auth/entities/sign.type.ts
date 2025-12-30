import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class Sign {
  @Field(() => String)
  accessToken: string;

  @Field(() => String, { nullable: true })
  refreshToken: string;
}
