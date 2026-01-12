import { Field, ObjectType } from '@nestjs/graphql';
import { Sign } from './sign.type';
import { User } from './user.entity';

@ObjectType()
export class CookiesData {
  @Field(() => Sign)
  tokens: Sign;

  @Field(() => User)
  user: User;
}
