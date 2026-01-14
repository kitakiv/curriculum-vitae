import { Field, ObjectType } from '@nestjs/graphql';
import { Sign } from './sign.type';
import { User } from './user.entity';

@ObjectType()
export class CookiesData {
  @Field(() => Sign, { description: 'Sign tokens' })
  tokens: Sign;

  @Field(() => User, { description: 'User data' })
  user: User;
}
