import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class allPermission {

  @Field(() => String, { description: 'Permission resource example: user' })
  resource: string;

  @Field(() => [String], {
    description: 'Permission actions example: [create, read, update, delete]',
  })
  actions: string[];

}
