import { Entity, Column } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Action } from 'src/roles/enums/action.enum';
import { Resource } from 'src/roles/enums/resource.enum';
@ObjectType()
@Entity()
export class Permission extends AbstractEntity<Permission> {
  @Field(() => ID)
  id: string;

  @Field(() => Resource)
  @Column('enum', { enum: Resource })
  resource: Resource;

  @Field(() => [Action])
  @Column('simple-array')
  actions: Action[];
}
