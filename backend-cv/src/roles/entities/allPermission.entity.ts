import { Entity, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Resource } from '../enums/resource.enum';
@ObjectType()
@Entity()
export class allPermission {

  @Field(() => String, { description: 'Permission resource example: user' })
  @Column('enum', { enum: Resource, unique: true })
  resource: string;

  @Field(() => [String], {
    description: 'Permission actions example: [create, read, update, delete]',
  })
  @Column('simple-array')
  actions: string[];

}
